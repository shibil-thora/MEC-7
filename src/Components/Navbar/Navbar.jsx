import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    // <header className="shadow-md fixed w-full" style={{ backgroundColor: '#04a8e8' }}>
    <header className="shadow-md fixed w-full" style={{ backgroundColor: '#04a8e8' }}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between h-16">
      {/* Left side: Logo and text */}
      <div className="flex items-center space-x-3">
        <img src="/logo-image.png" alt="Logo" className="h-10 object-contain" />
        <a href="/" className="text-xl font-bold text-gray-200">
          MEC7 KODUR AREA (beta)
        </a>
      </div>

      {/* Center: Navigation Links */}
      <div className="hidden md:flex md:items-center md:space-x-6">
        <a href="/" className="text-gray-800 hover:text-gray-600">Home</a>
        <a href="/about" className="text-gray-800 hover:text-gray-600">About</a>
        <a href="/contact" className="text-gray-800 hover:text-gray-600">Contact</a>
      </div>

      {/* Right side: Mobile menu toggle button */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
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

  {/* Mobile Menu */}
  {isOpen && (
    <div className="md:hidden">
      <a href="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Home</a>
      <a href="/about" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">About</a>
      <a href="/contact" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Contact</a>
    </div>
  )}
</header>

  );
};

export default Navbar;
