import React, { useState } from 'react';
import axios from 'axios';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message
    try {
      const res = await axios.post('https://trashclash-backend.onrender.com/api/auth/login', { username, password }, {headers:{'Content-Type': 'application/json'}});
      if(res.data?.token) {
      localStorage.setItem('token', res.data.token);
      onLogin(); // go to dashboard
      }else {
        throw new Error('No token received');
      }
    } catch(err) {
        console.error('Login failed:', err);
      setError('Invalid username or password');
    }
  };

  return (

    <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
      <h2>Admin Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
      <br />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <br />
      <button type="submit">Login</button>
    </form>
  );
}
