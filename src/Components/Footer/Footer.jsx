import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white shadow-t-md fixed bottom-0 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <span className="text-gray-600">&copy; 2024 MyWebsite. All rights reserved.</span>
          <div className="flex space-x-4">
            <a href="/privacy" className="text-gray-600 hover:text-gray-600">Privacy</a>
            <a href="/terms" className="text-gray-600 hover:text-gray-600">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
