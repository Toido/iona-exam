import { useContext, useEffect, useState } from 'react';
import { Container, Dropdown, DropdownButton } from 'react-bootstrap';
import { BreedContextType, ISelectedBreed } from 'src/@types/AppTypes';
import { fetchCatBreeds } from 'src/apis/cats';
import CatsList from 'src/components/CatsList/CatsList';
import AppContext from 'src/contexts/AppContext';

const Home = () => {
  const [catBreeds, setCatBreeds] = useState<ISelectedBreed[]>([]);

  const { selectedBreed, setSelectedBreed } = useContext(
    AppContext,
  ) as BreedContextType;

  const handleSelectBreed = (breed: ISelectedBreed) => {
    setSelectedBreed({
      id: breed.id,
      name: breed.name,
      origin: breed.origin,
      temperament: breed.temperament,
      description: breed.description,
    });
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
      <h3>Breeds</h3>
      <DropdownButton
        title={selectedBreed.name === '' ? 'Select Breed' : selectedBreed.name}
      >
        {catBreeds.map(breed => {
          const breedBody = {
            id: breed.id,
            name: breed.name,
            origin: breed.origin,
            temperament: breed.temperament,
            description: breed.description,
          };
          return (
            <Dropdown.Item
              key={breed.id}
              onClick={() => handleSelectBreed(breedBody)}
            >
              {breed.name}
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
      <CatsList />
    </Container>
  );
};

export default Home;
