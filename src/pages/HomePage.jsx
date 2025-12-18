import React, { useState, useEffect } from 'react';
import { useRental } from '../context/RentalContext';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Check, Home } from 'lucide-react';

const HomePage = () => {
  const { user } = useRental();
  const navigate = useNavigate();
  const [houses, setHouses] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
          setLoading(true);
          const res = await fetch(`https://house-rental-backend-1-5gyd.onrender.com/api/houses?query=${search}`);
          const data = await res.json();
          setHouses(Array.isArray(data) ? data : []);
      } catch (err) { console.error(err); setHouses([]); } finally { setLoading(false); }
    };
    fetchHouses();
  }, [search]);

  const handleBook = async (houseId) => {
    if(!user) { alert("Please Login to Request Booking"); navigate('/login'); return; }
    if(user.role === 'owner') return alert("Owners cannot book houses.");
    const res = await fetch(`https://house-rental-backend-1-5gyd.onrender.com/${houseId}/request`, { method: 'PUT', headers: { Authorization: `Bearer ${user.token}` } });
    if(res.ok) { alert("Request Sent!"); } else { alert("Error sending request"); }
  };

  const hasRequested = (house) => house.requests?.some(r => r.userId === user?._id);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
       <div className="bg-blue-600 px-6 py-16 text-center text-white">
           <h1 className="text-4xl font-extrabold mb-4">Find Your Home</h1>
           <div className="max-w-xl mx-auto flex bg-white p-2 rounded-full shadow-2xl">
               <input type="text" placeholder="Search location..." className="flex-1 px-6 py-3 rounded-full outline-none text-slate-700" onChange={(e) => setSearch(e.target.value)} />
               <button className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold">Search</button>
           </div>
       </div>

       <div className="max-w-6xl mx-auto p-6 -mt-10 relative z-10">
           {loading ? <div className="text-center p-10">Loading...</div> : houses.length === 0 ? (
               <div className="bg-white p-16 rounded-2xl shadow-lg text-center"><Home size={48} className="mx-auto text-slate-300"/><p>No houses found.</p></div>
           ) : (
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   {houses.map(house => (
                       <div key={house._id} className="bg-white p-4 rounded-2xl shadow-lg border border-slate-100 flex flex-col h-full">
                           <img src={(house.images && house.images.length>0) ? house.images[0] : "https://via.placeholder.com/400"} className="w-full h-48 object-cover rounded-xl bg-slate-200" alt="house"/>
                           <div className="flex-1 mt-4">
                               <div className="flex justify-between"><h3 className="font-bold text-lg">{house.title}</h3><p className="text-blue-600 font-bold">${house.rent}</p></div>
                               <p className="text-slate-500 text-sm mb-4"><MapPin size={14} className="inline"/> {house.location}</p>
                               <div className="flex gap-2">
                                   <button onClick={() => navigate(`/house/${house._id}`)} className="flex-1 border-2 border-slate-100 font-bold py-2 rounded-xl">Details</button>
                                   {house.isBooked ? <button disabled className="flex-1 bg-slate-100 text-slate-400 font-bold py-2 rounded-xl">Occupied</button> : hasRequested(house) ? <button disabled className="flex-1 bg-yellow-100 text-yellow-700 font-bold py-2 rounded-xl">Sent</button> : <button onClick={() => handleBook(house._id)} className="flex-1 bg-blue-600 text-white font-bold py-2 rounded-xl">Book</button>}
                               </div>
                           </div>
                       </div>
                   ))}
               </div>
           )}
       </div>
    </div>
  );
};

export default HomePage;