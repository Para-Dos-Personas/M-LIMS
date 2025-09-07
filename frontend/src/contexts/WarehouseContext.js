import React, { createContext, useState, useContext, useEffect } from 'react';
import warehouseService from '../services/warehouseService';
import auth from '../utils/auth';

const WarehouseContext = createContext();

export const useWarehouse = () => useContext(WarehouseContext);

export const WarehouseProvider = ({ children }) => {
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- THIS useEffect IS THE ONLY PART THAT HAS CHANGED ---
  useEffect(() => {
    const fetchAndSetWarehouses = async () => {
      // This logic now runs for ANY authenticated user.
      if (auth.isAuthenticated()) {
        try {
          // 1. Fetch the complete list of all warehouses for everyone.
          const response = await warehouseService.getAllWarehouses();
          let allWarehouses = response.data;
          
          // 2. Add the "All Warehouses" option to the top of the list for all users.
          const allWarehousesOption = { id: 'all', name: 'All Warehouses' };
          const finalWarehouseList = [allWarehousesOption, ...allWarehouses];
          setWarehouses(finalWarehouseList);
          
          // 3. Set the initial selected warehouse.
          if (finalWarehouseList.length > 0) {
            // Check localStorage, or default to "All Warehouses".
            const storedWarehouseId = localStorage.getItem('selectedWarehouseId') || 'all';
            const initialWarehouse = 
              finalWarehouseList.find(w => String(w.id) === storedWarehouseId) || finalWarehouseList[0];
            setSelectedWarehouse(initialWarehouse);
          }
        } catch (error) {
          console.error("Failed to fetch warehouses", error);
          // Set an empty state so the UI doesn't hang
          setWarehouses([]);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchAndSetWarehouses();
  }, []); // This effect runs once when the component mounts

  const selectWarehouse = (warehouse) => {
    setSelectedWarehouse(warehouse);
    localStorage.setItem('selectedWarehouseId', warehouse.id);
    window.location.reload();
  };

  const value = {
    warehouses,
    selectedWarehouse,
    selectWarehouse,
    loading,
  };

  return (
    <WarehouseContext.Provider value={value}>
      {children}
    </WarehouseContext.Provider>
  );
};

