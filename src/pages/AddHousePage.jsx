import React, { useState } from 'react';
import { useRental } from '../context/RentalContext';
import { useNavigate } from 'react-router-dom';
import { Image, MapPin, DollarSign, Type } from 'lucide-react';

const AddHousePage = () => {
  const { addHouse } = useRental();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ title: '', location: '', rent: '', type: 'Apartment', imageUrl: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    addHouse(formData);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#EFF8FF] p-4 flex items-center justify-center">
      <div className="bg-white p-8 rounded-[2rem] shadow-xl max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">List Your Property</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
           {/* Title */}
           <div>
             <label className="text-sm font-bold text-slate-700 ml-2">Property Title</label>
             <input type="text" required className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-100" 
               onChange={e => setFormData({...formData, title: e.target.value})} />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
               <label className="text-sm font-bold text-slate-700 ml-2">Location</label>
               <div className="relative">
                 <MapPin className="absolute left-4 top-4 text-slate-400 w-5 h-5" />
                 <input type="text" required className="w-full bg-slate-50 border border-slate-200 p-4 pl-12 rounded-xl outline-none focus:ring-2 focus:ring-blue-100" 
                   onChange={e => setFormData({...formData, location: e.target.value})} />
               </div>
             </div>
             <div>
               <label className="text-sm font-bold text-slate-700 ml-2">Rent (Monthly)</label>
               <div className="relative">
                 <DollarSign className="absolute left-4 top-4 text-slate-400 w-5 h-5" />
                 <input type="number" required className="w-full bg-slate-50 border border-slate-200 p-4 pl-12 rounded-xl outline-none focus:ring-2 focus:ring-blue-100" 
                   onChange={e => setFormData({...formData, rent: e.target.value})} />
               </div>
             </div>
           </div>

           <div>
             <label className="text-sm font-bold text-slate-700 ml-2">Image URL</label>
             <div className="relative">
               <Image className="absolute left-4 top-4 text-slate-400 w-5 h-5" />
               <input type="text" placeholder="https://..." className="w-full bg-slate-50 border border-slate-200 p-4 pl-12 rounded-xl outline-none focus:ring-2 focus:ring-blue-100" 
                 onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
             </div>
           </div>

           <button type="submit" className="w-full bg-[#3A9AF7] text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 hover:bg-[#247CEC] transition mt-4">
             Publish Listing
           </button>
        </form>
      </div>
    </div>
  );
};

export default AddHousePage;