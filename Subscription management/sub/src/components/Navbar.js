import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onLogout, user }) => {
  return (
    <nav className="bg-white border-b border-gray-200 py-4 px-6">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-blue-600 tracking-tight">SubManager</h1>
        <div className="flex items-center gap-6">
          <span className="text-gray-600 text-sm hidden md:block">Hello, {user.email}</span>
          <button onClick={onLogout} className="text-red-500 hover:text-red-700 font-medium text-sm">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;