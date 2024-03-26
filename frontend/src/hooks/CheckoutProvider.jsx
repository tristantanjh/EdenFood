// CheckoutContext.js
import React, { createContext, useContext, useState, useMemo } from 'react';
import useLocalStorage from './useLocalStorage';

const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
    const [selectedLocationLocalStorage, setSelectedLocationLocalStorage] = useLocalStorage('selectedLocationLocalStorage', '');

    const handleLocationChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedLocationLocalStorage(value); // Update selected location in localStorage
        } else {
            setSelectedLocationLocalStorage(''); // Clear selected location if unchecked
        }
      };

    const value = useMemo(
        () => ({
            selectedLocationLocalStorage,
            setSelectedLocationLocalStorage,
            handleLocationChange,
        }),
        [selectedLocationLocalStorage]
    );

    return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
};

export const useCheckout = () => useContext(CheckoutContext);