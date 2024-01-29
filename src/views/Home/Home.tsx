import { useContext, useEffect, useState } from 'react';
import { AppContextType, ISelectedBreed } from 'src/types/AppTypes';
import { fetchCatBreeds } from 'src/apis/cats';
import CatsList from 'src/views/Home/CatsList/CatsList';
import AppContext from 'src/contexts/AppContext';
import { StyledRow } from './styles';
import { StyledContainer } from 'src/styles';
import AlertContext from 'src/contexts/AlertContext';
import { AlertContextType } from 'src/types/AlertTypes';
import Dropdown from 'src/components/Dropdown/Dropdown';

const Home = () => {
  const [catBreeds, setCatBreeds] = useState<ISelectedBreed[]>([
    {
      id: 'Select breed',
      name: 'Select breed',
      temperament: '',
      description: '',
      origin: '',
    },
  ]);

  const { setAlert } = useContext(AlertContext) as AlertContextType;

  const { selectedBreed, setSelectedBreed, setSearch } = useContext(
    AppContext,
  ) as AppContextType;

  const handleSelectBreed = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const findBreed = catBreeds.find(cat => cat.id === event.target.value);

    if (findBreed) {
      setSelectedBreed(findBreed.id);
      setSearch({
        page: 1,
        id: findBreed.id,
      });
    }
  };

  useEffect(() => {
    // Fetch all cat breeds
    const fetchCats = async () => {
      try {
        const res = await fetchCatBreeds();

        setCatBreeds(prevData => [...prevData, ...res]);
      } catch (_) {
        setAlert({
          bodyMessage:
            'Apologies but we could not load new cats for you at this time! Miau!',
          show: true,
          variant: 'warning',
        });
      }
    };

    fetchCats();
  }, [setAlert]);

  return (
    <StyledContainer>
      <h1>Cat Browser</h1>
      <StyledRow>
        <Dropdown
          value={selectedBreed}
          onChange={handleSelectBreed}
          options={catBreeds}
        />
      </StyledRow>

      <CatsList
        selectedBreed={selectedBreed}
        setSelectedBreed={setSelectedBreed}
        setAlert={setAlert}
      />
    </StyledContainer>
  );
};

export default Home;
