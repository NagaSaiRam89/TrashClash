import React, { useState } from 'react';

export default function StrategyForm({ initialData = {}, onSubmit, onCancel }) {
  const [name, setName] = useState(initialData.name || '');
  const [troopCombo, setTroopCombo] = useState(initialData.troop_combo || '');
  const [tips, setTips] = useState(initialData.tips || '');
  const [imageUrl, setImageUrl] = useState(initialData.image_url || '');
  const [mode, setMode] = useState(initialData.mode || 'builder');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: initialData.id,
      name,
      troop_combo: troopCombo,
      tips,
      image_url: imageUrl,
      mode,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 border rounded shadow mt-4 space-y-4">
      <input
        type="text"
        placeholder="Strategy Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Troop Combo"
        value={troopCombo}
        onChange={(e) => setTroopCombo(e.target.value)}
        required
        className="w-full border p-2 rounded"
      />
      <textarea
        placeholder="Tips"
        value={tips}
        onChange={(e) => setTips(e.target.value)}
        required
        className="w-full border p-2 rounded"
      />
     
      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="w-full border p-2 rounded"
      />

       <select
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        className="w-full border p-2 rounded"
      >
        <option value="builder">Builder</option>
        <option value="town">Town</option>
      </select>
      
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Save
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-400 text-white px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </form>
  );
}
