// CheckoutContext.js
import React, { createContext, useContext, useState, useMemo } from "react";
import useLocalStorage from "./useLocalStorage";
import { useNavigate } from "react-router-dom";

const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const navigation = useNavigate();
  const [selectedLocationLocalStorage, setSelectedLocationLocalStorage] =
    useLocalStorage("selectedLocationLocalStorage", '');

  const handleLocationChangeLocalStorage = async (location) => {
    setSelectedLocationLocalStorage(location); // Update selected location in localStorage
    console.log("Location changed to: ", location)
  };

  const value = useMemo(
    () => ({
      selectedLocationLocalStorage,
      setSelectedLocationLocalStorage,
      handleLocationChangeLocalStorage,
    }),
    [selectedLocationLocalStorage]
  );

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  return useContext(CheckoutContext);
};
