// src/pages/HomePage.jsx

import React, { useEffect, useRef, useState } from 'react';
import TroopList from '../components/TroopList';
import LayoutList from '../components/LayoutList';
import StrategyList from '../components/StrategyList';
import Login from './Login';
import StickyNavbar from '../components/StickyNavbar';
import logo from '../ChatGPT Image Jul 4, 2025, 12_40_21 PM.png' 

export default function Homepage({ mode, setMode, onLogin, onLogout }) {
  const heroRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > (heroRef.current?.offsetHeight || 0));
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsAdmin(!!localStorage.getItem('token'));
  }, [localStorage.getItem('token')]);

  return (
    <div>
      {/* Hero Section */}
      <div
        ref={heroRef}
        className={`h-screen bg-cover bg-center transition-opacity duration-700 ease-in-out ${
          scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={{ backgroundImage: `url(https://imghost.online/ib/mZt7BrgrtEsFRKX_1751527103.jpg)` }}
      >
        <div className="h-full flex flex-col justify-center items-center gap-6">
{/*           <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">TrashClash 🛡️</h1>
*/}
          <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-white text-center">
          <img src="{logo}" alt="TrashClash Logo" className="h-24 w-24 mb-4" />
          <h1 className="text-4xl md:text-6xl font-bold">Welcome to TrashClash</h1>
          <p className="mt-2 text-lg md:text-xl">Your ultimate CoC base and strategy guide</p>
          </div>
          <div class="inline-flex">
            <button className="bg-blue-500 hover:bg-blue-700 text-gray-800 font-bold py-2 px-4 rounded-l"
            onClick={() => setMode('builder')}
            >
              Builder Hall
            </button>
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
            onClick={() => setMode('town')}
            >
              Town Hall
            </button>
          </div>


        </div>
      </div>

      {/* Sticky Nav */}
      {/* <div
        className={`sticky top-0 bg-white py-2 z-50 flex justify-between items-center px-6 shadow transition-opacity duration-500 ${
          scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <h1 className="text-xl font-bold">TrashClash 🛡️</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setMode('builder')}
            className={`px-4 py-2 rounded ${
              mode === 'builder' ? 'bg-blue-600 text-white' : 'bg-gray-100'
            }`}
          >
            Builder Hall
          </button>
          <button
            onClick={() => setMode('town')}
            className={`px-4 py-2 rounded ${
              mode === 'town' ? 'bg-blue-600 text-white' : 'bg-gray-100'
            }`}
          >
            Town Hall
          </button>
        </div>
      </div> */}
      {scrolled && <StickyNavbar mode={mode} setMode={setMode} />}

      {/* Main Content */}
      <div className="flex flex-col xl:flex-row gap-4 p-4">
        {/* Troops Section */}
        <div className="w-full xl:w-1/4">
          <TroopList mode={mode} isAdmin={isAdmin} />
        </div>

        {/* Layouts Section */}
        <div className="w-full xl:w-3/5">
          <LayoutList mode={mode} isAdmin={isAdmin} />
        </div>

        {/* Admin Section */}
        <div className="w-full xl:w-1/6 bg-white p-4 rounded shadow h-fit">
          {isAdmin ? (
            <>
              <p className="text-gray-700 mb-2">Welcome, Admin!</p>
              <button
                onClick={onLogout}
                className="text-red-500 hover:underline text-sm"
              >
                🔓 Logout
              </button>
            </>
          ) : (
            <>
              <h2 className="mb-2 font-semibold">Admin Login</h2>
              <Login onLogin={onLogin} />
            </>
          )}
        </div>
      </div>

      {/* Strategy Section */}
      <div className="p-4">
        <StrategyList mode={mode} isAdmin={isAdmin} />
      </div>
    </div>
  );
}
