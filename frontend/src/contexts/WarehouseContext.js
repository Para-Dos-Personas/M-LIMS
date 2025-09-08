// src/contexts/WarehouseContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAllWarehouses, getMyWarehouses } from '../services/warehouseService';
import auth from '../utils/auth';

const WarehouseContext = createContext();

export const useWarehouse = () => useContext(WarehouseContext);

export const WarehouseProvider = ({ children }) => {
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndSetWarehouses = async () => {
      if (!auth.isAuthenticated()) {
        setLoading(false);
        return;
      }

      try {
        const { role } = auth.getUser();
        const response = role === 'Admin'
          ? await getAllWarehouses()
          : await getMyWarehouses();

        const data = response.data;
        const allOption = { id: 'all', name: 'All Warehouses' };
        const list = [allOption, ...data];
        setWarehouses(list);

        const storedId = localStorage.getItem('selectedWarehouseId') || 'all';
        const initial = list.find(w => String(w.id) === storedId) || list[0];
        setSelectedWarehouse(initial);
      } catch (error) {
        console.error('Failed to fetch warehouses', error);
        setWarehouses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetWarehouses();
  }, []);

  const selectWarehouse = (warehouse) => {
    setSelectedWarehouse(warehouse);
    localStorage.setItem('selectedWarehouseId', warehouse.id);
  };

  return (
    <WarehouseContext.Provider
      value={{
        warehouses,
        selectedWarehouse,
        selectWarehouse,
        loading
      }}
    >
      {children}
    </WarehouseContext.Provider>
  );
};