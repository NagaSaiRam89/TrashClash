import React, { useState, useEffect } from 'react';

export default function LayoutForm({ onSubmit, onCancel, initialData = {} }) {
  const safeInitialData = initialData || {};

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    image_urls: [],
    layout_url: '',
    mode: 'builder',
    ...safeInitialData,
  });

  // If editing, ensure image_urls is an array
  useEffect(() => {
    if (safeInitialData.image_urls && typeof safeInitialData.image_urls === 'string') {
      setFormData(prev => ({
        ...prev,
        image_urls: safeInitialData.image_urls.split(',').map(url => url.trim())
      }));
    }
  }, [safeInitialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Special handling for image_urls
    if (name === 'image_urls') {
      const urlsArray = value.split(',').map(url => url.trim());
      setFormData(prev => ({ ...prev, image_urls: urlsArray }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      image_urls: formData.image_urls.filter(Boolean), // remove empty strings
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-gray-300 p-4 mb-4 rounded bg-white shadow"
    >
      <h3 className="text-lg font-semibold mb-2">
        {safeInitialData.id ? 'Edit Layout' : 'Add Layout'}
      </h3>

      <input
        name="name"
        placeholder="Layout Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-2 border mb-2 rounded"
      />

      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        required
        className="w-full p-2 border mb-2 rounded"
      >
        <option value="">Select Type</option>
        <option value="war">War</option>
        <option value="farming">Farming</option>
        <option value="defensive">Defensive</option>
      </select>

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-2 border mb-2 rounded"
      />

      <input
        name="image_urls"
        placeholder="Image URLs (comma separated)"
        value={formData.image_urls.join(',')}
        onChange={handleChange}
        className="w-full p-2 border mb-2 rounded"
      />

      <input
        name="layout_url"
        placeholder="Layout URL"
        value={formData.layout_url}
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
