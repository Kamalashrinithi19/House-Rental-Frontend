import React, { createContext, useState, useContext, useEffect } from 'react';

const RentalContext = createContext();

export const RentalProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [myHouses, setMyHouses] = useState([]);

  // --- Fetch Owner's Houses ---
  const fetchMyHouses = async () => {
    if(!user || user.role !== 'owner') return; 
    try {
      const res = await fetch('https://house-rental-backend-1-5gyd.onrender.com/api/houses/my-houses', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const data = await res.json();
      setMyHouses(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchMyHouses(); }, [user]);

  // --- Login ---
  const login = async (email, password) => {
    try {
      const res = await fetch('https://house-rental-backend-1-5gyd.onrender.com/api/users/login', {
        method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if(res.ok) {
          setUser(data);
          localStorage.setItem('user', JSON.stringify(data));
          return data; 
      }
      return null;
    } catch (error) { return null; }
  };

  // --- Register ---
  const register = async (userData) => {
    try {
      const res = await fetch('https://house-rental-backend-1-5gyd.onrender.com/api/users/register', {
          method: 'POST', headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(userData)
        });
        if(res.ok) {
          const data = await res.json();
          setUser(data);
          localStorage.setItem('user', JSON.stringify(data));
          return true;
        }
        return false;
    } catch (error) { return false; }
  }
// --- ADD THIS FUNCTION ---
  const vacateHouse = async (houseId) => {
    try {
      const res = await fetch(`https://house-rental-backend-1-5gyd.onrender.com/api/houses/${houseId}/vacate`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${user.token}` }
      });
      
      if (res.ok) {
        // Refresh local data immediately
        if (user.role === 'owner') fetchMyHouses(); 
        // If renter, you might want to refresh their booking list here
        return true;
      }
      return false;
    } catch (error) {
      console.error("Vacate Error:", error);
      return false;
    }
  };

  // Don't forget to add 'vacateHouse' to the value={{ ... }} list at the bottom!
  // --- FIX 3: ADD THE MISSING BOOKING FUNCTION HERE ---
  const bookHouse = async (houseId) => {
      if(!user) return false;
      try {
          // NOTICE: I added "/api/houses" before the ID
          const res = await fetch(`https://house-rental-backend-1-5gyd.onrender.com/api/houses/${houseId}/request`, {
              method: 'PUT',
              headers: { 
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${user.token}` 
              }
          });
          return res.ok;
      } catch (error) {
          console.error("Booking Error:", error);
          return false;
      }
  };

  const logout = () => {
    setUser(null);
    setMyHouses([]);
    localStorage.removeItem('user');
  };

  return (
    // Don't forget to add 'bookHouse' to this list!
    <RentalContext.Provider value={{ user, myHouses, login, register, logout, fetchMyHouses, bookHouse }}>
      {children}
    </RentalContext.Provider>
  );
};

export const useRental = () => useContext(RentalContext);