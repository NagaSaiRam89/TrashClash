import React, { useEffect, useState, useCallback } from 'react';
import { getStrategiesByMode, addStrategy, updateStrategy, deleteStrategy } from '../api/api';
import StrategyForm from './StrategyForm';

export default function StrategyList({ mode, isAdmin = true }) {
  const [strategies, setStrategies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingStrategy, setEditingStrategy] = useState(null);

  const fetchData = useCallback(async () => {
    if (!mode) return setStrategies([]);
    try {
      const res = await getStrategiesByMode(mode);
      setStrategies(res.data);
    } catch (err) {
      console.error('Error fetching strategies:', err);
      setStrategies([]);
    }
  }, [mode]);

  useEffect(() => {
    fetchData();
  }, [mode, fetchData]);

  const handleSave = async (data) => {
    if (data.id) {
      await updateStrategy(data.id, data);
    } else {
      await addStrategy(data);
    }
    setShowForm(false);
    setEditingStrategy(null);
    fetchData();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this strategy?')) {
      await deleteStrategy(id);
      fetchData();
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Attack Strategies</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {strategies.map((s) => (
          <div key={s.id} className="border p-4 rounded shadow bg-white space-y-2">
            {s.image_url && (
              <img
                src={s.image_url}
                alt={s.name}
                className="w-full h-40 object-cover rounded"
              />
            )}
            <h3 className="text-lg font-semibold">{s.name}</h3>
            <p><strong>Combo:</strong> {s.troop_combo}</p>
            <p className="text-sm text-gray-600">{s.tips}</p>
            {isAdmin && (
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => {
                    setEditingStrategy(s);
                    setShowForm(true);
                  }}
                  className="text-blue-600 hover:underline"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="text-red-500 hover:underline"
                >
                  ❌ Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {isAdmin && (
        <button
          onClick={() => {
            setEditingStrategy(null);
            setShowForm(true);
          }}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        >
          ➕ Add Strategy
        </button>
      )}

      {showForm && (
        <StrategyForm
          initialData={editingStrategy}
          onSubmit={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingStrategy(null);
          }}
        />
      )}
    </div>
  );
}
