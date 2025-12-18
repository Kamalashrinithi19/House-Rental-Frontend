import React, { createContext, useState, useContext, useEffect } from 'react';

const RentalContext = createContext();

export const RentalProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [myHouses, setMyHouses] = useState([]);

  // --- FIX 1: Corrected URL for fetching houses ---
  const fetchMyHouses = async () => {
    if(!user || user.role !== 'owner') return; 
    try {
      // CHANGED: From '/api/users/register' to '/api/houses/my-houses'
      const res = await fetch('https://house-rental-backend-1-5gyd.onrender.com/api/houses/my-houses', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const data = await res.json();
      setMyHouses(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchMyHouses(); }, [user]);

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

  // --- FIX 2: Clean URL for Register ---
  const register = async (userData) => {
    try {
      // I typed this URL manually to ensure NO hidden spaces exist
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

  const logout = () => {
    setUser(null);
    setMyHouses([]);
    localStorage.removeItem('user');
  };

  return (
    <RentalContext.Provider value={{ user, myHouses, login, register, logout, fetchMyHouses }}>
      {children}
    </RentalContext.Provider>
  );
};

export const useRental = () => useContext(RentalContext);