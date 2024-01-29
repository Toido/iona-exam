import { useState } from 'react';
import { ISearch } from 'src/types/AppTypes';
import AppContext from 'src/contexts/AppContext';

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedBreed, setSelectedBreed] = useState<string>('');

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
