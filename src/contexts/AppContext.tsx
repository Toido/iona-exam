import { createContext } from 'react';
import { BreedContextType } from 'src/@types/AppTypes';

const AppContext = createContext<BreedContextType>({
  selectedBreed: {
    id: '',
    name: '',
    origin: '',
    temperament: '',
    description: '',
  },
  setSelectedBreed: () => {},
});

export default AppContext;
