import React from 'react';

export default function ModeSwitch({ mode, setMode }) {
  return (
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
      <button 
        onClick={() => setMode('builder')} 
        style={{ background: mode === 'builder' ? '#4caf50' : '#ccc' }}
      >
        Builder Hall
      </button>
      <button
        onClick={() => setMode('town')}
        style={{ background: mode === 'town' ? '#2196f3' : '#ccc' }}
      >
        Town Hall
      </button>
    </div>
  );
}
