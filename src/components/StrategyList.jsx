import React, { useEffect, useState, useCallback } from 'react';
import { getStrategiesByMode } from '../api/api';
import StrategyForm from './StrategyForm';
import { addStrategy, updateStrategy, deleteStrategy } from '../api/api';


export default function StrategyList({ mode, isAdmin=true }) {
  const [strategies, setStrategies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingStrategy, setEditingStrategy] = useState(null);
  

 
  const fetchData = useCallback(async ({mode}) => {
    if (!mode) {
        setStrategies([]); // Clear layouts if no mode is selected
        return;
    }
  try {
    const res = await getStrategiesByMode(mode);
    setStrategies(res.data);
  } catch (err) {
    console.error(err);
    setStrategies([]); // Clear layouts on error
  }
}, []);

useEffect(() => {
    fetchData({mode});
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
    <div>

    <div style={{ marginTop: '2rem' }}>
      <h2>Attack Strategies</h2>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {strategies.map(strategy => (
    <div key={strategy.id} style={{ border: '1px solid #aaa', padding: '1rem' }}>
        <h3>{strategy.name}</h3>
        <p><strong>Troop Combo:</strong> {strategy.troop_combo}</p>
        <p>{strategy.tips}</p>
        {strategy.image_url && (
      <img
        src={strategy.image_url}
        alt={strategy.name}
        className="w-full h-40 object-cover mb-2 rounded"
      />
      )}
        { isAdmin &&(
            <div>
            <button onClick={() => {
                setEditingStrategy(strategy);
                setShowForm(true);
            }}>✏️ Edit</button>
    
            <button onClick={() => handleDelete(strategy.id)}>❌ Delete</button>
            </div>

        )}
    </div>
    ))}
      </div>
    </div>
    {isAdmin && (
        <button onClick={() => {
        setEditingStrategy(null);
        setShowForm(true);
        }}>
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
