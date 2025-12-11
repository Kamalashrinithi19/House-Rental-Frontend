import React, { useState } from 'react';
import { useRental } from '../context/RentalContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Mail, Lock } from 'lucide-react';

const LoginPage = () => {
  const { login } = useRental();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ email: '', password: '', role: 'renter' });

  const handleSubmit = (e) => {
    e.preventDefault(); // STOP PAGE RELOAD
    login(formData.email, formData.role);
    navigate('/dashboard'); // Go to Dashboard
  };

  return (
    <div className="min-h-screen bg-[#EFF8FF] flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-[2rem] shadow-xl w-full max-w-md border border-blue-50">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-[#EFF8FF] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#3A9AF7]">
            <LogIn className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800">Welcome Back</h2>
          <p className="text-slate-400 mt-2">Please enter your details to sign in</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
              <input 
                type="email" 
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-[#3A9AF7] focus:ring-2 focus:ring-blue-100 transition-all text-slate-700 font-medium"
                placeholder="user@example.com"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
              <input 
                type="password" 
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-[#3A9AF7] focus:ring-2 focus:ring-blue-100 transition-all text-slate-700 font-medium"
                placeholder="••••••••"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          {/* Role Selector */}
          <div className="flex gap-4 p-1 bg-slate-50 rounded-xl">
             <button 
               type="button"
               onClick={() => setFormData({...formData, role: 'renter'})}
               className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${formData.role === 'renter' ? 'bg-white text-[#3A9AF7] shadow-sm' : 'text-slate-400'}`}
             >
               Renter
             </button>
             <button 
               type="button"
               onClick={() => setFormData({...formData, role: 'owner'})}
               className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${formData.role === 'owner' ? 'bg-white text-[#3A9AF7] shadow-sm' : 'text-slate-400'}`}
             >
               Owner
             </button>
          </div>

          <button type="submit" className="w-full bg-[#3A9AF7] hover:bg-[#247CEC] text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95">
            Sign In
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center mt-8 text-slate-500 font-medium">
          Don't have an account? <Link to="/register" className="text-[#3A9AF7] font-bold hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;