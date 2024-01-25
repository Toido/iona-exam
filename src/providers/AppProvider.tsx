import { useState } from 'react';
import { ISearch, ISelectedBreed } from 'src/@types/AppTypes';
import AppContext from 'src/contexts/AppContext';

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedBreed, setSelectedBreed] = useState<ISelectedBreed>({
    id: '',
    name: '',
    origin: '',
    temperament: '',
    description: '',
  });

  const [search, setSearch] = useState<ISearch>({
    id: '',
    page: 1,
  });

  return (
    <AppContext.Provider
      value={{ selectedBreed, setSelectedBreed, search, setSearch }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
