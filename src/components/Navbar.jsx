import React from 'react';
import { Link } from 'react-router-dom';
import { Home, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-[#EFF8FF] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-[#EFF8FF] p-2 rounded-xl group-hover:bg-[#DBEEFE] transition-colors">
            <Home className="w-6 h-6 text-[#3A9AF7]" />
          </div>
          <span className="font-bold text-xl text-slate-800 tracking-tight">RentEase</span>
        </Link>

        {/* Menu */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" text="Home" />
          <NavLink to="/houses" text="Browse" />
          <NavLink to="/dashboard" text="Dashboard" />
        </div>

        {/* Login Button - Congress Blue */}
        <Link to="/login" className="bg-[#3A9AF7] hover:bg-[#247CEC] text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-100">
          Login
        </Link>
      </div>
    </nav>
  );
};

const NavLink = ({ to, text }) => (
  <Link to={to} className="text-slate-500 font-medium hover:text-[#3A9AF7] transition-colors">
    {text}
  </Link>
);

export default Navbar;