import { useContext, useEffect, useState } from 'react';
import { Col, FormGroup, FormLabel, FormSelect } from 'react-bootstrap';
import { AppContextType, ISelectedBreed } from 'src/@types/AppTypes';
import { fetchCatBreeds } from 'src/apis/cats';
import CatsList from 'src/views/Home/CatsList/CatsList';
import AppContext from 'src/contexts/AppContext';
import { StyledRow } from './styles';
import { StyledContainer } from 'src/styles';

const Home = () => {
  const [catBreeds, setCatBreeds] = useState<ISelectedBreed[]>([]);

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
        setCatBreeds(res.data);
      } catch (e) {
        console.log({ e });
      }
    };

    fetchCats();
  }, []);

  return (
    <StyledContainer>
      <h1>Cat Browser</h1>
      <StyledRow>
        <FormGroup>
          <FormLabel>Breed</FormLabel>
          <Col md={3} sm={6} xs={12}>
            <FormSelect value={selectedBreed} onChange={handleSelectBreed}>
              <option key="placeholder" hidden value="">
                Select breed
              </option>
              {catBreeds.map((breed, index) => (
                <option key={index} value={breed.id}>
                  {breed.name}
                </option>
              ))}
            </FormSelect>
          </Col>
        </FormGroup>
      </StyledRow>

      <CatsList />
    </StyledContainer>
  );
};

export default Home;
