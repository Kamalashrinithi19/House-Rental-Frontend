import React, { useState } from 'react';
import { useRental } from '../context/RentalContext';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, User, Mail, Lock } from 'lucide-react';

const RegisterPage = () => {
  const { register } = useRental();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'renter' });

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#EFF8FF] flex items-center justify-center px-4 py-10">
      <div className="bg-white p-8 rounded-[2rem] shadow-xl w-full max-w-md border border-blue-50">
        
        <div className="text-center mb-8">
          <div className="bg-[#EFF8FF] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#3A9AF7]">
            <UserPlus className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800">Create Account</h2>
          <p className="text-slate-400 mt-2">Join us to find your dream home</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
              <input type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-[#3A9AF7] focus:ring-2 focus:ring-blue-100 transition-all text-slate-700" placeholder="John Doe"
                onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
              <input type="email" required className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-[#3A9AF7] focus:ring-2 focus:ring-blue-100 transition-all text-slate-700" placeholder="john@example.com"
                onChange={(e) => setFormData({...formData, email: e.target.value})} />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
              <input type="password" required className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-[#3A9AF7] focus:ring-2 focus:ring-blue-100 transition-all text-slate-700" placeholder="••••••••"
                onChange={(e) => setFormData({...formData, password: e.target.value})} />
            </div>
          </div>

          {/* Role Toggle */}
          <div className="grid grid-cols-2 gap-3">
             <div onClick={() => setFormData({...formData, role: 'renter'})} 
                  className={`cursor-pointer p-3 rounded-xl border-2 text-center transition-all ${formData.role === 'renter' ? 'border-[#3A9AF7] bg-blue-50 text-[#3A9AF7]' : 'border-slate-100 text-slate-400'}`}>
                <span className="block font-bold text-sm">I want to Rent</span>
             </div>
             <div onClick={() => setFormData({...formData, role: 'owner'})} 
                  className={`cursor-pointer p-3 rounded-xl border-2 text-center transition-all ${formData.role === 'owner' ? 'border-[#3A9AF7] bg-blue-50 text-[#3A9AF7]' : 'border-slate-100 text-slate-400'}`}>
                <span className="block font-bold text-sm">I am an Owner</span>
             </div>
          </div>

          <button type="submit" className="w-full bg-[#3A9AF7] hover:bg-[#247CEC] text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95">
            Create Account
          </button>
        </form>

        <p className="text-center mt-8 text-slate-500 font-medium">
          Already a member? <Link to="/login" className="text-[#3A9AF7] font-bold hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;