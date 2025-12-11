import React, { useState } from 'react';
import { useRental } from '../context/RentalContext';
import HouseCard from '../components/HouseCard';
import { Search, Filter } from 'lucide-react';

const HomePage = () => {
  const { houses, loading } = useRental();
  const [selectedCategory, setSelectedCategory] = useState('All'); // State for active filter
  const [searchTerm, setSearchTerm] = useState('');

  // --- FILTERING LOGIC ---
  const filteredHouses = houses.filter(house => {
    // 1. Filter by Category
    const categoryMatch = selectedCategory === 'All' || house.type === selectedCategory;
    // 2. Filter by Search (Location or Title)
    const searchMatch = house.location.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        house.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-[#EFF8FF]">
      
      <header className="pt-12 pb-10 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
          <div>
             <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Find your next <br/><span className="text-[#3A9AF7]">perfect stay</span></h1>
             <p className="text-slate-500">Search through verified listings.</p>
          </div>
          
          {/* Search Input */}
          <div className="bg-white p-2 rounded-2xl shadow-sm border border-blue-100 flex items-center w-full md:w-96">
            <Search className="text-slate-400 w-5 h-5 ml-3" />
            <input 
              type="text" 
              placeholder="Search location..." 
              className="flex-1 px-3 py-2 outline-none text-slate-700 bg-transparent"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* --- CATEGORY BUTTONS (WORKING NOW) --- */}
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar mb-8">
          {['All', 'Villa', 'Apartment', 'Cottage', 'Penthouse'].map((cat) => (
            <button 
              key={cat} 
              onClick={() => setSelectedCategory(cat)} // <--- CLICK HANDLER
              className={`px-6 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all 
                ${selectedCategory === cat 
                  ? 'bg-[#3A9AF7] text-white shadow-lg shadow-blue-200 scale-105' 
                  : 'bg-white text-slate-500 hover:bg-[#DBEEFE] hover:text-[#3A9AF7]'}`
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* Grid */}
      <section className="px-6 pb-20 max-w-7xl mx-auto">
        {loading ? (
          <div className="text-center py-20 text-slate-400">Loading properties...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredHouses.length > 0 ? (
              filteredHouses.map(house => (
                <HouseCard key={house._id} house={house} />
              ))
            ) : (
              <div className="col-span-full text-center text-slate-400 py-10">
                No properties found for this category.
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;