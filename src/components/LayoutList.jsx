import React, { useEffect, useState, useCallback } from 'react';
import { getLayoutsByMode, addLayout, updateLayout, deleteLayout } from '../api/api';
import LayoutForm from './LayoutForm';
import { useNavigate } from 'react-router-dom';

export default function LayoutList({ mode, isAdmin = true }) {
  const [layouts, setLayouts] = useState([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingLayout, setEditingLayout] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    if (!mode) {
      setLayouts([]);
      return;
    }
    setIsLoading(true);
    try {
      const res = await getLayoutsByMode(mode);
      setLayouts(res.data);
    } catch (err) {
      console.error(err);
      setLayouts([]);
    } finally {
      setIsLoading(false);
    }
  }, [mode]);

  useEffect(() => {
    fetchData();
  }, [mode, fetchData]);

  const handleSave = async (data) => {
    if (data.id) {
      await updateLayout(data.id, data);
    } else {
      await addLayout(data);
    }
    setShowForm(false);
    setEditingLayout(null);
    fetchData();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this layout?')) {
      await deleteLayout(id);
      fetchData();
    }
  };

  const filteredLayouts = layouts.filter(layout => {
    const nameMatch = layout.name.toLowerCase().includes(search.toLowerCase());
    const typeMatch = typeFilter === 'all' || layout.type === typeFilter;
    return nameMatch && typeMatch;
  });

  const totalPages = Math.ceil(filteredLayouts.length / itemsPerPage);
  const paginatedLayouts = filteredLayouts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  function LayoutCard({ layout, isAdmin, onEdit, onDelete, onClick }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
  
    useEffect(() => {
      if (!layout.image_urls || layout.image_urls.length <= 1) return;
  
      const interval = setInterval(() => {
        if (!isHovered) {
          setCurrentIndex((prev) => (prev + 1) % layout.image_urls.length);
        }
      }, 3000);
  
      return () => clearInterval(interval);
    }, [isHovered, layout.image_urls]);
  
    const currentImage = layout.image_urls?.[currentIndex] || '/placeholder.jpg';
  
    return (
      <div
        className="cursor-pointer border border-gray-300 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white"
        onClick={() => onClick(layout.id)}
      >
        <div
          className="w-full h-48 overflow-hidden relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={currentImage}
            alt={`${layout.name}-${currentIndex}`}
            className="w-full h-48 object-cover transition-all duration-500"
          />
        </div>
  
        <div className="p-2">
          <h3 className="font-semibold text-lg">{layout.name}</h3>
          <p className="text-sm text-gray-600 truncate">{layout.description}</p>
  
          {isAdmin && (
            <div className="mt-2 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(layout);
                }}
                className="text-blue-500 hover:underline"
              >
                ✏️ Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(layout.id);
                }}
                className="text-red-500 hover:underline"
              >
                ❌ Delete
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
  

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Base Layouts</h2>

      <div className="mb-4 flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          placeholder="Search layouts..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="p-2 border rounded w-full sm:w-auto"
        />

        <select
          value={typeFilter}
          onChange={(e) => {
            setTypeFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="p-2 border rounded"
        >
          <option value="all">All Types</option>
          <option value="war">War</option>
          <option value="farming">Farming</option>
          <option value="defensive">Defensive</option>
        </select>

        {isAdmin && (
          <button
            onClick={() => {
              setEditingLayout(null);
              setShowForm(true);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            ➕ Add Layout
          </button>
        )}
      </div>

      {/* Loader or Layout Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedLayouts.map((layout) => (
            <LayoutCard
              key={layout.id}
              layout={layout}
              isAdmin={isAdmin}
              onEdit={(l) => {
                setEditingLayout(l);
                setShowForm(true);
              }}
              onDelete={handleDelete}
              onClick={(id) => navigate(`/layouts/${id}`)}
            />
          ))}
        </div>

      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1 ? 'bg-blue-500 text-white' : ''
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && isAdmin && (
        <LayoutForm
          initialData={editingLayout}
          onSubmit={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingLayout(null);
          }}
        />
      )}
    </div>
  );
}
