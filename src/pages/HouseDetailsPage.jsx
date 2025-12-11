import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRental } from '../context/RentalContext';
import { MapPin, ArrowLeft, Star, CheckCircle } from 'lucide-react';

const HouseDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { houses, user, bookHouse } = useRental();
  
  // --- FIX IS HERE: changed h._id to h.id ---
  const house = houses.find(h => h.id === id); // JSON Server uses string IDs by default
  
  const [date, setDate] = useState('');
  const [activeImage, setActiveImage] = useState(0);

  if (!house) return <div className="text-center pt-20">House not found</div>;

  const images = house.images && house.images.length > 0 
    ? house.images 
    : ["https://via.placeholder.com/800x600?text=No+Image+Available"];

  const handleBook = () => {
    if (!user) return navigate('/login');
    if (!date) return alert('Please select a date');
    bookHouse(house, date);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#EFF8FF] p-6 pb-20">
      <div className="max-w-5xl mx-auto bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-blue-100">
        
        {/* Gallery */}
        <div className="p-6 pb-0">
            <div className="relative h-[500px] rounded-[2rem] overflow-hidden mb-4 bg-black flex items-center justify-center border border-slate-100">
                <img 
                    src={images[activeImage]} 
                    className="w-full h-full object-contain" 
                    alt="Main View"
                />
                <button onClick={() => navigate(-1)} className="absolute top-6 left-6 bg-white/90 p-3 rounded-full hover:bg-white transition shadow-sm z-10">
                    <ArrowLeft className="w-5 h-5 text-slate-700" />
                </button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 px-1">
                {images.map((img, index) => (
                    <button 
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`min-w-[100px] h-24 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 bg-slate-100 ${activeImage === index ? 'border-[#3A9AF7] opacity-100 ring-2 ring-blue-100' : 'border-transparent opacity-70 hover:opacity-100'}`}
                    >
                        <img src={img} className="w-full h-full object-cover" alt={`Thumbnail ${index}`} />
                    </button>
                ))}
            </div>
        </div>

        {/* Details */}
        <div className="p-8 md:p-10">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                 <span className="bg-blue-50 text-[#3A9AF7] px-3 py-1 rounded-full text-xs font-bold uppercase">{house.type}</span>
                 <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm">
                    <Star className="w-4 h-4 fill-current" /> {house.rating}
                 </div>
              </div>
              <h1 className="text-3xl font-extrabold text-slate-800 mb-2">{house.title}</h1>
              <p className="text-slate-400 flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {house.location}
              </p>
            </div>
            <div className="text-right mt-4 md:mt-0">
               <span className="text-4xl font-bold text-[#3A9AF7]">${house.rent}</span>
               <span className="text-slate-400 font-medium">/month</span>
            </div>
          </div>

          {/* Features */}
          <div className="mb-10">
             <h3 className="font-bold text-slate-800 text-xl mb-6">Property Features</h3>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                 {(house.amenities || []).map((feature, idx) => (
                     <div key={idx} className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                         <div className="bg-white p-2 rounded-full text-[#3A9AF7] shadow-sm">
                            <CheckCircle className="w-5 h-5" />
                         </div>
                         <span className="text-slate-600 font-medium text-sm">{feature}</span>
                     </div>
                 ))}
             </div>
          </div>

          {/* Booking */}
          <div className="bg-[#F0F7FF] p-8 rounded-[2rem] border border-blue-100">
             <h3 className="font-bold text-slate-800 mb-4 text-lg">Interested? Book a visit</h3>
             <div className="flex flex-col md:flex-row gap-4">
                <input 
                  type="date" 
                  className="flex-1 p-4 rounded-xl border border-slate-200 outline-none text-slate-600 focus:border-[#3A9AF7] bg-white shadow-sm"
                  onChange={(e) => setDate(e.target.value)}
                />
                <button 
                  onClick={handleBook}
                  className="bg-[#3A9AF7] hover:bg-[#247CEC] text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-200 transition active:scale-95"
                >
                  Request Booking
                </button>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HouseDetailsPage;