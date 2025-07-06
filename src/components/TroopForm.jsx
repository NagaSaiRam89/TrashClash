import React, { useState, useEffect } from 'react';

export default function TroopForm({ onSubmit, onCancel, initialData = {} }) {
  const safeInitialData = initialData || {};
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    level: '',
    description: '',
    image_url: '',
    mode: 'builder',
    ...safeInitialData,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      level: parseInt(formData.level, 10), // ensure level is a number
    });
  };

  return (
    <form onSubmit={handleSubmit} className="border border-gray-300 p-4 mb-4 rounded bg-white shadow">
      <h3 className="text-lg font-semibold mb-2">{safeInitialData.id ? 'Edit Troop' : 'Add Troop'}</h3>

      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-2 border mb-2 rounded"
      />

      <input
        name="type"
        placeholder="Type"
        value={formData.type}
        onChange={handleChange}
        required
        className="w-full p-2 border mb-2 rounded"
      />

      <input
        name="level"
        placeholder="Level"
        type="number"
        value={formData.level}
        onChange={handleChange}
        required
        className="w-full p-2 border mb-2 rounded"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-2 border mb-2 rounded"
      />

      <input
        name="image_url"
        placeholder="Image URL"
        value={formData.image_url}
        onChange={handleChange}
        className="w-full p-2 border mb-2 rounded"
      />

      <select
        name="mode"
        value={formData.mode}
        onChange={handleChange}
        className="w-full p-2 border mb-4 rounded"
      >
        <option value="builder">Builder</option>
        <option value="town">Town</option>
      </select>

      <div className="flex gap-4">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-black px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
