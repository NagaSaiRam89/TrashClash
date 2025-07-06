// src/pages/LayoutDetailPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLayoutsByMode, updateLayout, deleteLayout } from '../api/api';
import LayoutForm from '../components/LayoutForm';
import TroopList from '../components/TroopList';
import Login from './Login';
import StickyNavbar from '../components/StickyNavbar';


export default function LayoutDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [layout, setLayout] = useState(null);
  const [allLayouts, setAllLayouts] = useState([]);
  const [editing, setEditing] = useState(false);
  const [mode, setMode] = useState(localStorage.getItem('mode') || 'builder');
  const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const fetchLayoutAndAll = async () => {
      try {
        const data = await getLayoutsByMode(mode);
        const layouts = data.data || [];
        const found = layouts.find(l => l.id === parseInt(id));
    
        setAllLayouts(layouts);
    
        if (found) {
          setLayout(found);
        } else {
          setLayout('not-found');
        }
      } catch (err) {
        console.error('Error fetching layout:', err);
        setLayout('error');
      }
    };
    

    fetchLayoutAndAll();
  }, [id, mode]);

  const handleSave = async (updatedLayout) => {
    try {
      await updateLayout(layout.id, updatedLayout);
      setLayout(updatedLayout);
      setEditing(false);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this layout?')) {
      try {
        await deleteLayout(layout.id);
        navigate('/');
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  };

  const goToLayout = (layoutId) => {
    navigate(`/layouts/${layoutId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAdmin(false);
    window.location.reload();
  };

  if (layout === null) {
    return <div className="p-6">Loading layout...</div>;
  }
  
  if (layout === 'not-found') {
    navigate('/');
    return null;
    }
  
  if (layout === 'error') {
    return <div className="p-6 text-red-600">Failed to load layout.</div>;
  }
  
  return (
    <div>
      <StickyNavbar mode={mode} setMode={setMode} />
    <div className="flex flex-col xl:flex-row gap-6 p-6">
      {/* Left: Troops */}
      <div className="w-full xl:w-1/4 bg-white p-4 rounded shadow">
        <h2 className="text-lg font-bold mb-2">Troops</h2>
        <TroopList mode={mode} isAdmin={false} />
      </div>

      {/* Center: Layout Details */}
      <div className="w-full xl:w-[60%] bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">{layout.name}</h2>

        <div className="relative w-full h-64 overflow-hidden mb-4">
          {layout.image_urls?.length > 0 ? (
            <div className="flex overflow-x-scroll space-x-4">
              {layout.image_urls.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`${layout.name} - ${idx}`}
                  className="h-64 rounded object-cover"
                />
              ))}
            </div>
          ) : (
            <img
              src="/placeholder.jpg"
              alt="placeholder"
              className="h-64 w-full object-cover rounded"
            />
          )}
        </div>

        <p className="mb-2"><strong>Type:</strong> {layout.type}</p>
        <p className="mb-2"><strong>Description:</strong> {layout.description}</p>

          {layout.layout_url && (
      <div className="mt-4">
      <a
        href={layout.layout_url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        🧭 Use This Layout
      </a>
  </div>
)}


        {isAdmin && (
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              ✏️ Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              ❌ Delete
            </button>
          </div>
        )}

        {editing && (
          <LayoutForm
            initialData={layout}
            onSubmit={handleSave}
            onCancel={() => setEditing(false)}
          />
        )}
      </div>

      {/* Right: Layout Filter + Login/Logout */}
      <div className="w-full xl:w-1/6 bg-white p-4 rounded shadow">
        <select
          value={mode}
          onChange={(e) => {
            setMode(e.target.value);
            localStorage.setItem('mode', e.target.value);
          }}
          className="w-full mb-2 p-2 border rounded"
        >
          <option value="builder">Builder Hall</option>
          <option value="town">Town Hall</option>
        </select>

        <h2 className="text-lg font-semibold mb-2">More Layouts</h2>
        <div className="space-y-2 overflow-y-auto max-h-72">
          {allLayouts.map((l) => (
            <button
              key={l.id}
              onClick={() => goToLayout(l.id)}
              className={`block w-full text-left px-2 py-1 rounded hover:bg-gray-200 ${
                l.id === layout.id ? 'bg-blue-100 font-semibold' : ''
              }`}
            >
              {l.name}
            </button>
          ))}
        </div>

        {/* Admin Login or Logout */}
        <div className="mt-6">
          {isAdmin ? (
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 px-4 rounded"
            >
              🔓 Logout
            </button>
          ) : (
            <>
              <h3 className="font-semibold mb-2">Admin Login</h3>
              <Login onLogin={() => window.location.reload()} />
            </>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
