
import React, { useState } from 'react';

const CodeBypass: React.FC = () => {
    const [code, setCode] = useState('');
    const [analysisResult, setAnalysisResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAnalysis = (instruction: string) => {
        if (!code) {
            setError("Code block cannot be empty.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setAnalysisResult(`Simulating analysis for: "${instruction}"...\n\nThis is a mock response. In a real scenario, an API call would be made to the G3L agent with the provided code and this instruction.\nThe agent would return a detailed analysis here.`);

        // Simulate API latency
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6 backdrop-blur-sm shadow-2xl shadow-indigo-500/10">
            <h2 className="text-xl font-bold text-indigo-300 mb-4">Code Bypass & Analysis</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="code-input" className="block text-sm font-medium text-gray-400 mb-1">Code Input</label>
                    <textarea
                        id="code-input"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        rows={18}
                        className="w-full h-full bg-gray-900/70 border border-gray-600 rounded-md p-3 font-mono text-sm text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                        placeholder="Paste decompiled APK, obfuscated script, or any code block here..."
                    />
                </div>
                <div>
                    <div className="flex flex-col space-y-3 mb-4">
                         <button onClick={() => handleAnalysis("Analyze this code for security vulnerabilities")} disabled={isLoading} className="w-full text-left p-3 bg-red-600/80 hover:bg-red-600 text-white font-semibold rounded-md transition disabled:opacity-50">Analyze for Security Vulnerabilities</button>
                         <button onClick={() => handleAnalysis("Identify all network endpoints")} disabled={isLoading} className="w-full text-left p-3 bg-blue-600/80 hover:bg-blue-600 text-white font-semibold rounded-md transition disabled:opacity-50">Identify All Network Endpoints</button>
                         <button onClick={() => handleAnalysis("De-obfuscate this function")} disabled={isLoading} className="w-full text-left p-3 bg-yellow-600/80 hover:bg-yellow-600 text-white font-semibold rounded-md transition disabled:opacity-50">De-obfuscate This Function</button>
                    </div>
                     <label className="block text-sm font-medium text-gray-400 mb-1">Analysis Result</label>
                     <div className="w-full h-80 bg-black/50 border border-gray-700 rounded-md p-3 font-mono text-sm overflow-y-auto relative">
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-400"></div>
                                <span className="ml-3 text-indigo-300">Analyzing...</span>
                            </div>
                        )}
                        {error && <pre className="text-red-400 whitespace-pre-wrap">{`Error: ${error}`}</pre>}
                        {analysisResult && <pre className="text-gray-300 whitespace-pre-wrap">{analysisResult}</pre>}
                        {!isLoading && !error && !analysisResult && <span className="text-gray-500">Analysis results will appear here.</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodeBypass;
