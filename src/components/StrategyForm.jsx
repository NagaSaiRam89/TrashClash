import React, { useState } from 'react';

export default function StrategyForm({ initialData = {}, onSubmit, onCancel }) {
  const [name, setName] = useState(initialData?.name || '');
  const [troopCombo, setTroopCombo] = useState(initialData?.troop_combo || '');
  const [tips, setTips] = useState(initialData?.tips || '');
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || '');
  const [mode, setMode] = useState(initialData?.mode || 'builder');

  const handleSubmit = (e) => {
    e.preventDefault();

    const strategyData = {
      id: initialData?.id, // include ID if editing
      name,
      troop_combo: troopCombo,
      tips,
      image_url: imageUrl,
      mode,
    };

    if (!name || !troopCombo || !tips) {
      alert('Please fill in all required fields');
      return;
    }

    onSubmit(strategyData); // this should never be null now
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border mt-4 rounded bg-white shadow">
      <h2 className="text-lg font-bold">
        {initialData?.id ? 'Edit Strategy' : 'Add Strategy'}
      </h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="text"
        placeholder="Troop Combo"
        value={troopCombo}
        onChange={(e) => setTroopCombo(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <textarea
        placeholder="Tips"
        value={tips}
        onChange={(e) => setTips(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

     

      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="w-full p-2 border rounded"
      />

       <select
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="builder">Builder Hall</option>
        <option value="town">Town Hall</option>
      </select>

      
      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          💾 Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
        >
          ❌ Cancel
        </button>
      </div>
    </form>
  );
}
