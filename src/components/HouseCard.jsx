import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';

const HouseCard = ({ house }) => {
  // Use first image or fallback
  const thumbnail = house.images && house.images.length > 0 
    ? house.images[0] 
    : "https://via.placeholder.com/400x300?text=No+Image";

  return (
    <div className="bg-white rounded-[2rem] p-3 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group h-full flex flex-col border border-slate-50">
      
      <div className="relative h-56 rounded-[1.5rem] overflow-hidden mb-4">
        <img 
          src={thumbnail} 
          alt={house.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold text-slate-700 shadow-sm">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          {house.rating}
        </div>
        <div className="absolute bottom-3 left-3 bg-[#3A9AF7] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
           {house.type}
        </div>
      </div>

      <div className="px-2 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-slate-800 text-lg leading-tight truncate pr-2">{house.title}</h3>
        </div>
        
        <div className="flex items-center text-slate-400 text-sm mb-4">
          <MapPin className="w-3 h-3 mr-1" />
          <span className="truncate">{house.location}</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
          <div>
            <span className="text-xl font-bold text-[#3A9AF7]">${house.rent}</span>
            <span className="text-slate-400 text-xs">/mo</span>
          </div>
          
          {/* --- FIX IS HERE: changed house._id to house.id --- */}
          <Link 
            to={`/houses/${house.id}`} 
            className="bg-[#EFF8FF] text-[#3A9AF7] hover:bg-[#3A9AF7] hover:text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HouseCard;