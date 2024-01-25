import { useState } from 'react';
import { ISelectedBreed } from 'src/@types/AppTypes';
import AppContext from 'src/contexts/AppContext';

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedBreed, setSelectedBreed] = useState<ISelectedBreed>({
    id: '',
    name: '',
    origin: '',
    temperament: '',
    description: '',
  });

  return (
    <AppContext.Provider value={{ selectedBreed, setSelectedBreed }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
