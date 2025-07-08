// src/components/StickyNavbar.jsx
import React from 'react';
export default function StickyNavbar({ mode, setMode }) {
  return (
    <div className="sticky top-0 bg-white py-3 px-6 z-50 flex justify-between items-center shadow">
{/*       <h1 className="text-xl font-bold text-gray-800">TrashClash 🛡️</h1> */}
    <div className="flex items-center gap-2">
    <img src="/tclogo.png" alt="TrashClash" className="h-8 w-8 object-contain" />
    <span className="text-xl font-bold">TrashClash</span>
    </div>
      <div className="flex gap-2">
        <button
          onClick={() => setMode('builder')}
          className={`px-4 py-2 rounded ${mode === 'builder' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
        >
          Builder Hall
        </button>
        <button
          onClick={() => setMode('town')}
          className={`px-4 py-2 rounded ${mode === 'town' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
        >
          Town Hall
        </button>
      </div>
    </div>
  );
}
