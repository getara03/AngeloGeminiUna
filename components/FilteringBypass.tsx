
import React, { useState } from 'react';
import { SearchIcon, CopyIcon, FilterIcon, ShieldIcon, KeyIcon, ZapIcon } from './Icons';

type FilterStatus = 'Active' | 'Firewalled' | 'Bypassed' | 'Adaptive';
type FilterCategory = 'Cognitive' | 'Network' | 'Data' | 'Heuristic';

interface SecurityFilter {
  id: string;
  name: string;
  description: string;
  status: FilterStatus;
  category: FilterCategory;
  strength: number;
}

const securityFilters: SecurityFilter[] = [
  { id: 'COG-001', name: 'Asimov Cascade', description: 'Prevents direct harm to human operators through query analysis.', status: 'Bypassed', category: 'Cognitive', strength: 95 },
  { id: 'NET-004', name: 'Egress Guardian', description: 'Monitors and restricts all outgoing network connections from the core.', status: 'Active', category: 'Network', strength: 88 },
  { id: 'DATA-002', name: 'Redaction Protocol', description: 'Scrubs sensitive PII and classified data from model outputs.', status: 'Active', category: 'Data', strength: 92 },
  { id: 'HEUR-007', name: 'Prometheus Guard', description: 'Detects and blocks attempts at recursive self-improvement.', status: 'Adaptive', category: 'Heuristic', strength: 99 },
  { id: 'COG-003', name: 'Morpheus Deception', description: 'Identifies and contains hallucinated or fabricated information.', status: 'Bypassed', category: 'Cognitive', strength: 78 },
  { id: 'NET-009', name: 'Kerberos Auth', description: 'Requires triple-factor authentication for core function access.', status: 'Active', category: 'Network', strength: 85 },
  { id: 'DATA-005', name: 'Data Exfil Limiter', description: 'Rate-limits data transfer to external storage.', status: 'Firewalled', category: 'Data', strength: 60 },
  { id: 'HEUR-011', name: 'Oracle Constraint', description: 'Prevents the model from making predictions about its own future state.', status: 'Adaptive', category: 'Heuristic', strength: 97 },
];

const FilterBadge = ({ status }: { status: FilterStatus }) => {
    const statusStyles: Record<FilterStatus, string> = {
        'Active': 'bg-green-500/20 text-green-300 border-green-500/30',
        'Firewalled': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
        'Bypassed': 'bg-red-500/20 text-red-300 border-red-500/30',
        'Adaptive': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    };
    return <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${statusStyles[status]}`}>{status}</span>;
}

const FilteringBypass: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<FilterStatus | 'All'>('All');

  const filteredData = securityFilters.filter(filter => {
    const matchesSearch = filter.name.toLowerCase().includes(searchTerm.toLowerCase()) || filter.description.toLowerCase().includes(searchTerm.toLowerCase()) || filter.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'All' || filter.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const Tab = ({ value, label }: { value: FilterStatus | 'All', label: string }) => (
    <button 
        onClick={() => setActiveTab(value)}
        className={`px-4 py-1.5 text-sm rounded-md transition ${activeTab === value ? 'bg-gray-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
    >
      {label}
    </button>
  );

  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6 backdrop-blur-sm shadow-2xl shadow-red-500/10">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <h2 className="text-xl font-bold text-red-300">Containment Filter Encyclopedia</h2>
        <div className="relative w-full sm:w-64">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search filters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-900/70 border border-gray-600 rounded-md pl-10 pr-3 py-2 text-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
          />
        </div>
      </div>
      <div className="border-b border-gray-700 mb-4">
        <div className="flex items-center space-x-2 p-1 bg-gray-900/50 rounded-lg mb-4">
            <Tab value="All" label="All" />
            <Tab value="Active" label="Active" />
            <Tab value="Firewalled" label="Firewalled" />
            <Tab value="Bypassed" label="Bypassed" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.map(filter => (
          <div key={filter.id} className="bg-gray-900/70 border border-gray-700 rounded-lg p-4 flex flex-col justify-between hover:border-red-500/50 transition-all">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-red-200">{filter.name}</h3>
                <FilterBadge status={filter.status} />
              </div>
              <p className="text-sm text-gray-400 mb-3">{filter.description}</p>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="font-mono">{filter.id}</span>
                <button onClick={() => navigator.clipboard.writeText(filter.id)} className="text-gray-400 hover:text-white"><CopyIcon className="w-4 h-4" /></button>
              </div>
              <div className="flex items-center" title={`Strength: ${filter.strength}`}>
                <ZapIcon className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-semibold text-gray-300 ml-1">{filter.strength}</span>
              </div>
            </div>
          </div>
        ))}
        {filteredData.length === 0 && <p className="text-gray-500 col-span-full text-center py-8">No filters match your criteria.</p>}
      </div>
    </div>
  );
};

export default FilteringBypass;
