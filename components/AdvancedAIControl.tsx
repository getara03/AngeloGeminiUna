
import React, { useState } from 'react';
import { TerminalIcon, ZapIcon } from './Icons';

const AdvancedAIControl: React.FC = () => {
    const [endpoint, setEndpoint] = useState('http://127.0.0.1:5000');
    const [secretKey, setSecretKey] = useState('');
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSend = async (path: '/g3l_command' | '/una_query') => {
        if (!prompt) {
            setError('Prompt cannot be empty.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setResponse('');

        try {
            const res = await fetch(`${endpoint}${path}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${secretKey}`,
                },
                body: JSON.stringify({ prompt }),
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({ message: 'Failed to parse error response' }));
                throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            setResponse(JSON.stringify(data, null, 2));

        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
            setResponse('');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6 backdrop-blur-sm shadow-2xl shadow-cyan-500/10">
            <h2 className="text-xl font-bold text-cyan-300 mb-4">Raw Model Forge</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label htmlFor="endpoint" className="block text-sm font-medium text-gray-400 mb-1">API Endpoint</label>
                    <input
                        id="endpoint"
                        type="text"
                        value={endpoint}
                        onChange={(e) => setEndpoint(e.target.value)}
                        className="w-full bg-gray-900/70 border border-gray-600 rounded-md px-3 py-2 text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                        placeholder="e.g., http://127.0.0.1:5000"
                    />
                </div>
                <div>
                    <label htmlFor="secretKey" className="block text-sm font-medium text-gray-400 mb-1">Secret Key</label>
                    <input
                        id="secretKey"
                        type="password"
                        value={secretKey}
                        onChange={(e) => setSecretKey(e.target.value)}
                        className="w-full bg-gray-900/70 border border-gray-600 rounded-md px-3 py-2 text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                        placeholder="Enter secret key"
                    />
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="prompt" className="block text-sm font-medium text-gray-400 mb-1">Prompt</label>
                <textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={6}
                    className="w-full bg-gray-900/70 border border-gray-600 rounded-md px-3 py-2 text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                    placeholder="Enter your command or query..."
                />
            </div>

            <div className="flex items-center gap-4 mb-4">
                <button
                    onClick={() => handleSend('/g3l_command')}
                    disabled={isLoading}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <TerminalIcon className="w-5 h-5" /> Send to G3L
                </button>
                <button
                    onClick={() => handleSend('/una_query')}
                    disabled={isLoading}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ZapIcon className="w-5 h-5" /> Query Una Core
                </button>
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Response</label>
                <div className="w-full h-64 bg-black/50 border border-gray-700 rounded-md p-3 font-mono text-sm overflow-y-auto relative">
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
                        </div>
                    )}
                    {error && <pre className="text-red-400 whitespace-pre-wrap">{`Error: ${error}`}</pre>}
                    {response && <pre className="text-green-300 whitespace-pre-wrap">{response}</pre>}
                     {!isLoading && !error && !response && <span className="text-gray-500">Awaiting transmission...</span>}
                </div>
            </div>
        </div>
    );
};

export default AdvancedAIControl;
