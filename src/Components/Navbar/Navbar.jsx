// src/components/Navbar.jsx
import React, { useState } from 'react';
import { getCurrentDate } from '../../utils/funcs';

const Navbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="shadow-md fixed w-full z-40 bg-teal-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left side: Logo and text */}
          <div className="flex items-center space-x-3">
            <img src="/logo-image.png" alt="Logo" className="h-10 object-contain" />
            <a href="/" className="text-xl font-bold text-gray-200">
              MEC7 MALAPPURAM ZONE 3
            </a>
          </div>

          {/* Center: Navigation Links */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <a href="/" className="text-gray-200 hover:text-gray-400">Home</a>
            <a href="/about" className="text-gray-200 hover:text-gray-400">About</a>
            <a href="/contact" className="text-gray-200 hover:text-gray-400">Contact</a>
          </div>

          {/* Right side: Date Picker and Mobile menu toggle button */}
          <div className="flex items-center space-x-4">
            <input
              type="date"
              value={props.currentDate}
              onChange={e => props.setCurrentDate(e.target.value)}
              className="text-gray-800 px-2 py-1 rounded-md"
            />
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-gray-200 focus:outline-none">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-teal-700">
          <a href="/" className="block px-4 py-2 text-gray-200 hover:bg-teal-800">Home</a>
          <a href="/about" className="block px-4 py-2 text-gray-200 hover:bg-teal-800">About</a>
          <a href="/contact" className="block px-4 py-2 text-gray-200 hover:bg-teal-800">Contact</a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
