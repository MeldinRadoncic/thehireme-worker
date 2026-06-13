import React, { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Location = {
  country: string;
  countryCode: string;
  city: string;
  lat?: number;
  lng?: number;
};

type LocationContextType = {
  location: Location | null;
  setLocation: (location: Location) => Promise<void>;
  clearLocation: () => Promise<void>;
};

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocationState] = useState<Location | null>(null);

  const setLocation = async (loc: Location) => {
    setLocationState(loc);
    await AsyncStorage.setItem('user_location', JSON.stringify(loc));
  };

  const clearLocation = async () => {
    setLocationState(null);
    await AsyncStorage.removeItem('user_location');
  };

  return (
    <LocationContext.Provider value={{ location, setLocation, clearLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within LocationProvider');
  }
  return context;
}
