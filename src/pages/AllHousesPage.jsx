import React, { useState } from 'react';
import { useRental } from '../context/RentalContext';
import HouseCard from '../components/HouseCard';

const AllHousesPage = () => {
  const { houses } = useRental();
  const [filter, setFilter] = useState('');

  // Simple filtering logic
  const filteredHouses = houses.filter(house => 
    house.location.toLowerCase().includes(filter.toLowerCase()) ||
    house.type.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Available Properties</h2>
        <input 
          type="text" 
          placeholder="Filter by location or type..." 
          className="border p-2 rounded-lg w-64 shadow-sm"
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredHouses.map(house => (
          <HouseCard key={house._id} house={house} />
        ))}
      </div>
    </div>
  );
};

export default AllHousesPage;