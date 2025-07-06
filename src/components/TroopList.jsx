// src/components/TroopList.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { getTroopsByMode, addTroop, updateTroop, deleteTroop } from '../api/api';
import TroopForm from './TroopForm';

const placeholderImg = 'https://via.placeholder.com/60';

export default function TroopList({ mode, isAdmin = true }) {
  const [troops, setTroops] = useState([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [editingTroopId, setEditingTroopId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const fetchData = useCallback(async () => {
    if (!mode) {
      setTroops([]);
      return;
    }
    try {
      const res = await getTroopsByMode(mode);
      setTroops(res.data);
    } catch (err) {
      console.error(err);
      setTroops([]);
    }
  }, [mode]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredTroops = troops.filter(t => {
    const nameMatch = t.name.toLowerCase().includes(search.toLowerCase());
    const typeMatch = typeFilter === 'all' || t.type === typeFilter;
    return nameMatch && typeMatch;
  });

  const handleSave = async (data) => {
    try {
      if (data.id) {
        await updateTroop(data.id, data);
      } else {
        await addTroop(data);
      }
      setShowForm(false);
      setEditingTroopId(null);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this troop?')) {
      await deleteTroop(id);
      fetchData();
    }
  };

  const handleEdit = (id) => {
    setEditingTroopId(id);
    setShowForm(true);
  };

  return (
    <div className="p-4">
      {/* Search & Filter */}
      <div className="mb-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Search troops..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border rounded w-48"
          />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="all">All Types</option>
            <option value="Melee">Melee</option>
            <option value="Ranged">Ranged</option>
            <option value="Air">Air</option>
          </select>
          {isAdmin && (
            <button
              onClick={() => {
                setEditingTroopId(null);
                setShowForm(true);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              ➕ Add Troop
            </button>
          )}
        </div>
      </div>

      {/* Troop Grid with 2 columns on large screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {filteredTroops.map(troop => (
          <div
            key={troop.id}
            className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition-shadow"
          >
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => setSelectedId(selectedId === troop.id ? null : troop.id)}
            >
              <img
                src={troop.image_url || placeholderImg}
                alt={troop.name}
                className="w-16 h-16 rounded-full object-cover border"
              />
              <span className="mt-2 font-medium text-sm text-center">{troop.name}</span>
            </div>

            {selectedId === troop.id && (
              <div className="mt-4 text-sm text-gray-700">
                <p><strong>Type:</strong> {troop.type}</p>
                <p><strong>Level:</strong> {troop.level}</p>
                <p><strong>Description:</strong> {troop.description}</p>

                {isAdmin && editingTroopId !== troop.id && (
                  <div className="mt-2 flex gap-2">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => handleEdit(troop.id)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDelete(troop.id)}
                    >
                      ❌ Delete
                    </button>
                  </div>
                )}

                {isAdmin && editingTroopId === troop.id && showForm && (
                  <TroopForm
                    initialData={troop}
                    onSubmit={handleSave}
                    onCancel={() => {
                      setShowForm(false);
                      setEditingTroopId(null);
                    }}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Form at Bottom */}
      {isAdmin && showForm && editingTroopId === null && (
        <TroopForm
          initialData={{}}
          onSubmit={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingTroopId(null);
          }}
        />
      )}
    </div>
  );
}
