import React from 'react';
import { useRental } from '../context/RentalContext';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, Plus, MapPin, Calendar, CreditCard } from 'lucide-react';

const DashboardPage = () => {
  const { user, bookings, houses, logout } = useRental();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#EFF8FF] p-6 pb-20">
      <div className="max-w-5xl mx-auto">
        
        {/* Dashboard Header */}
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-blue-50 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-[#DBEEFE] p-4 rounded-full text-[#3A9AF7]">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Hello, {user.name}</h1>
              <p className="text-slate-400 font-medium capitalize">{user.role} Account</p>
            </div>
          </div>
          
          <div className="flex gap-3">
             {user.role === 'owner' && (
               <Link to="/add-house" className="bg-[#3A9AF7] hover:bg-[#247CEC] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition shadow-lg shadow-blue-200">
                 <Plus className="w-5 h-5" /> Add Property
               </Link>
             )}
             <button onClick={handleLogout} className="bg-red-50 hover:bg-red-100 text-red-500 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition">
               <LogOut className="w-5 h-5" /> Logout
             </button>
          </div>
        </div>

        {/* Content Section */}
        {user.role === 'owner' ? (
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-6 ml-2">My Listed Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {houses.map(house => (
                <div key={house._id} className="bg-white p-4 rounded-[2rem] flex gap-4 items-center shadow-sm hover:shadow-md transition">
                   <img src={house.imageUrl} className="w-24 h-24 rounded-2xl object-cover" />
                   <div>
                      <h3 className="font-bold text-slate-800">{house.title}</h3>
                      <p className="text-slate-400 text-sm flex items-center gap-1 mb-2">
                        <MapPin className="w-3 h-3" /> {house.location}
                      </p>
                      <span className="bg-[#EFF8FF] text-[#3A9AF7] px-3 py-1 rounded-lg text-sm font-bold">${house.rent}/mo</span>
                   </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-6 ml-2">My Recent Bookings</h2>
            <div className="space-y-4">
              {bookings.length === 0 ? <p className="text-slate-400 ml-2">No bookings yet.</p> : bookings.map((booking) => (
                <div key={booking.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-blue-50 flex flex-col md:flex-row justify-between items-center gap-4">
                   <div className="flex items-center gap-4">
                      <div className="bg-[#EFF8FF] p-3 rounded-2xl text-[#3A9AF7]">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-slate-800">{booking.houseTitle}</h3>
                        <p className="text-slate-400 text-sm">Date: {booking.date}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-6">
                      <div className="text-right">
                         <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total</p>
                         <p className="text-[#3A9AF7] font-bold text-xl">${booking.price}</p>
                      </div>
                      <span className={`px-4 py-2 rounded-xl text-sm font-bold ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                        {booking.status}
                      </span>
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default DashboardPage;

