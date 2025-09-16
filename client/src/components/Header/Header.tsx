import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white p-4 border-b border-gray-200 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-xl font-bold">ratagen</h1>
        <nav className="ml-10">
          <a href="#" className="text-gray-600 hover:text-gray-900 mr-4">Live Chat</a>
          <a href="#" className="text-gray-600 hover:text-gray-900 mr-4">Contacts</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">Settings</a>
        </nav>
      </div>
      <div className="flex items-center">
        <a href="#" className="text-gray-600 hover:text-gray-900 mr-4">WhatsApp</a>
        <a href="#" className="text-gray-600 hover:text-gray-900 mr-4">Rates</a>
        <a href="#" className="text-gray-600 hover:text-gray-900 mr-4">Queries</a>
        <a href="#" className="text-gray-600 hover:text-gray-900 mr-4">Playground</a>
        <a href="#" className="text-gray-600 hover:text-gray-900 mr-4">Docs</a>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md mr-4">Usage</button>
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
      </div>
    </header>
  );
};

export default Header;
