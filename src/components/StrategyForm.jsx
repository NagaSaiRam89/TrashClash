import React, { useState, useEffect } from 'react';

export default function StrategyForm({ initialData = {}, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    troop_combo: '',
    tips: '',
    image_url: '',
    mode: 'builder',
    ...initialData,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const strategyData = {
      ...formData,
    };

    if (!formData.name || !formData.troop_combo || !formData.tips) {
      alert('Please fill in all required fields.');
      return;
    }

    onSubmit(strategyData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border mt-4 rounded bg-white shadow"
    >
      <h2 className="text-lg font-bold">
        {formData.id ? 'Edit Strategy' : 'Add Strategy'}
      </h2>

      <input
        name="name"
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        name="troop_combo"
        type="text"
        placeholder="Troop Combo"
        value={formData.troop_combo}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <textarea
        name="tips"
        placeholder="Tips"
        value={formData.tips}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        name="image_url"
        type="text"
        placeholder="Image URL"
        value={formData.image_url}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <select
        name="mode"
        value={formData.mode}
        onChange={handleChange}
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
