import React, { createContext, useState, useContext, useEffect } from 'react';

const RentalContext = createContext();

export const RentalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [houses, setHouses] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- 1. FETCH DATA FROM JSON SERVER (The Fake API) ---
  useEffect(() => {
    const fetchHouses = async () => {
      try {
        setLoading(true);
        // This calls the json-server running on port 5000
        const response = await fetch('http://localhost:5000/houses');
        const data = await response.json();
        setHouses(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();
  }, []);

  // --- 2. AUTHENTICATION ---
  const login = (email, role) => {
    setUser({ name: 'Demo User', email, role });
    return true;
  };

  const register = (userData) => {
    setUser(userData);
    return true;
  };

  const logout = () => setUser(null);

  // --- 3. ADD HOUSE (Saves to db.json) ---
  const addHouse = async (newHouse) => {
    // Format the new house data
    const houseData = {
      ...newHouse,
      images: [newHouse.imageUrl], // Ensure array format
      amenities: ['WiFi', 'Kitchen'], // Default amenities
      rating: 5.0
    };

    try {
      // Send POST request to API
      const res = await fetch('http://localhost:5000/houses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(houseData)
      });
      const data = await res.json();
      
      // Update local state instantly
      setHouses([...houses, data]); 
    } catch (error) {
      console.error("Error adding house:", error);
    }
  };

  // --- 4. BOOK HOUSE (Saves to db.json) ---
  const bookHouse = async (house, dates) => {
    const newBooking = {
      houseTitle: house.title,
      date: dates,
      price: house.rent,
      status: 'Pending',
      userEmail: user?.email
    };

    try {
      const res = await fetch('http://localhost:5000/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBooking)
      });
      const data = await res.json();
      setBookings([...bookings, data]);
    } catch (error) {
      console.error("Error booking:", error);
    }
  };

  return (
    <RentalContext.Provider value={{ user, houses, bookings, loading, login, register, logout, addHouse, bookHouse }}>
      {children}
    </RentalContext.Provider>
  );
};

export const useRental = () => useContext(RentalContext);