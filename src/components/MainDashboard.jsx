import React, { useState } from 'react';
import TroopList from './TroopList';
import LayoutList from './LayoutList';
import StrategyList from './StrategyList';

export default function MainDashboard({ onLogout }) {
  const [mode, setMode] = useState('builder'); // ✅ Must be 'town' or 'builder'

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Mode Selector */}
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setMode('town')}
          className={`px-4 py-2 rounded ${
            mode === 'town' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          🏰 Town Hall
        </button>
        <button
          onClick={() => setMode('builder')}
          className={`px-4 py-2 rounded ${
            mode === 'builder' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          🛠️ Builder Hall
        </button>
      </div>

      <TroopList mode={mode} />
      <LayoutList mode={mode} />
      <StrategyList mode={mode} />
    </div>
  );
}
