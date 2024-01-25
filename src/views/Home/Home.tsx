import { useContext, useEffect, useState } from 'react';
import {
  Container,
  Form,
  FormGroup,
  FormLabel,
  FormSelect,
} from 'react-bootstrap';
import { AppContextType, ISelectedBreed } from 'src/@types/AppTypes';
import { fetchCatBreeds } from 'src/apis/cats';
import CatsList from 'src/views/Home/CatsList/CatsList';
import AppContext from 'src/contexts/AppContext';

const Home = () => {
  const [catBreeds, setCatBreeds] = useState<ISelectedBreed[]>([]);

  const { selectedBreed, setSelectedBreed, setSearch } = useContext(
    AppContext,
  ) as AppContextType;

  const handleSelectBreed = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const findBreed = catBreeds.find(cat => cat.id === event.target.value);

    if (findBreed) {
      setSelectedBreed({
        id: findBreed.id,
        name: findBreed.name,
        origin: findBreed.origin,
        temperament: findBreed.temperament,
        description: findBreed.description,
      });
      setSearch({
        page: 1,
        id: findBreed.id,
      });
    }
  };

  useEffect(() => {
    // Fetch all cat breeds
    const fetchCats = async () => {
      const res = await fetchCatBreeds();
      setCatBreeds(res.data);
    };

    fetchCats();
  }, []);

  return (
    <Container>
      <h1>Cat Browser</h1>
      <Form>
        <FormGroup>
          <FormLabel>Breed</FormLabel>
          <FormSelect value={selectedBreed.id} onChange={handleSelectBreed}>
            <option key="placeholder" hidden value="">
              Select breed
            </option>
            {catBreeds.map((breed, index) => (
              <option key={index} value={breed.id}>
                {breed.name}
              </option>
            ))}
          </FormSelect>
        </FormGroup>
      </Form>

      <CatsList />
    </Container>
  );
};

export default Home;
