import { createContext } from 'react';
import { AppContextType } from 'src/@types/AppTypes';

const AppContext = createContext<AppContextType>({
  selectedBreed: {
    id: '',
    name: '',
    origin: '',
    temperament: '',
    description: '',
  },
  setSelectedBreed: () => {},
  search: {
    id: '',
    page: 1,
  },
  setSearch: () => {},
});

export default AppContext;
