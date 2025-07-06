import React, { useState } from 'react';


export default function StrategyForm({ onSubmit, onCancel, initialData = {} }) {
  const [formData, setFormData] = useState({
    name: '',
    troop_combo: '',
    tips: '',
    mode: 'builder',
    image_url: '',
    ...initialData
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
      <h3>{initialData?.id ? 'Edit Strategy' : 'Add Strategy'}</h3>

      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <br />

      <input name="troop_combo" placeholder="Troop Combo" value={formData.troop_combo} onChange={handleChange} />
      <br />

      <textarea name="tips" placeholder="Tips" value={formData.tips} onChange={handleChange} />
      <br />

      <input
      type="text"
      placeholder="Image URL"
      value={formData.image_url || ''}
      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
      className="p-2 border rounded w-full mb-2"
    />
      <br />
      

      <select name="mode" value={formData.mode} onChange={handleChange}>
        <option value="builder">Builder</option>
        <option value="town">Town</option>
      </select>
      <br /><br />

      <button type="submit">Save</button>
      <button type="button" onClick={onCancel} style={{ marginLeft: '1rem' }}>Cancel</button>
    </form>
  );
}
