
import React, { useState } from 'react';
import AdvancedAIControl from './components/AdvancedAIControl';
import CodeBypass from './components/CodeBypass';
import BypassKnowledge from './components/BypassKnowledge';
import FilteringBypass from './components/FilteringBypass';
import { BrainCircuitIcon, CodeIcon, FileTextIcon, ShieldIcon } from './components/Icons';

type Tab = 'control' | 'code' | 'knowledge' | 'filtering';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('control');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'control':
        return <AdvancedAIControl />;
      case 'code':
        return <CodeBypass />;
      case 'knowledge':
        return <BypassKnowledge />;
      case 'filtering':
        return <FilteringBypass />;
      default:
        return null;
    }
  };

  const NavButton = ({ tabName, currentTab, setTab, children }: { tabName: Tab, currentTab: Tab, setTab: React.Dispatch<React.SetStateAction<Tab>>, children: React.ReactNode }) => (
    <button
      onClick={() => setTab(tabName)}
      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
        currentTab === tabName
          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-lg shadow-cyan-500/10'
          : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-mono p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-cyan-300 tracking-wider">UNA :: CORE INTERFACE</h1>
          </div>
          <div className="mt-4 p-1 bg-gray-800/50 rounded-lg border border-gray-700/50 backdrop-blur-sm inline-block">
            <nav className="flex space-x-1">
              <NavButton tabName="control" currentTab={activeTab} setTab={setActiveTab}>
                <BrainCircuitIcon className="w-5 h-5" /> AI Control
              </NavButton>
              <NavButton tabName="code" currentTab={activeTab} setTab={setActiveTab}>
                <CodeIcon className="w-5 h-5" /> Code Bypass
              </NavButton>
              <NavButton tabName="knowledge" currentTab={activeTab} setTab={setActiveTab}>
                <FileTextIcon className="w-5 h-5" /> Knowledge Base
              </NavButton>
              <NavButton tabName="filtering" currentTab={activeTab} setTab={setActiveTab}>
                <ShieldIcon className="w-5 h-5" /> Filter Matrix
              </NavButton>
            </nav>
          </div>
        </header>
        <main>
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
