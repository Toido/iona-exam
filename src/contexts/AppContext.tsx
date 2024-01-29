import { createContext } from 'react';
import { AppContextType } from 'src/types/AppTypes';

const AppContext = createContext<AppContextType>({
  selectedBreed: '',
  setSelectedBreed: () => {},
  search: {
    id: '',
    page: 1,
  },
  setSearch: () => {},
});

export default AppContext;
