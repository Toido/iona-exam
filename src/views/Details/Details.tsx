import { useContext, useEffect, useMemo, useState } from 'react';
import { Button, CardText, CardTitle } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ISelectedBreed } from 'src/@types/AppTypes';
import { fetchSelectedCatImage } from 'src/apis/cats';
import ImageCard from 'src/components/ImageCard/ImageCard';
import Loading from 'src/components/Loading/Loading';
import AlertContext from 'src/contexts/AlertContext';
import AppContext from 'src/contexts/AppContext';
import { StyledContainer } from 'src/styles';
import { StyledMessage } from './styles';

type DetailsParams = {
  catId: string;
};

const Details = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [catDetails, setCatDetails] = useState<ISelectedBreed>({
    id: '',
    name: '',
    origin: '',
    temperament: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showNoCats, setShowNoCats] = useState(false);
  const { setAlert } = useContext(AlertContext);
  const { setSelectedBreed, selectedBreed } = useContext(AppContext);
  const navigate = useNavigate();

  const { catId } = useParams<DetailsParams>();

  const fetchCatDetails = useMemo(
    () => async () => {
      try {
        if (catId) {
          setIsLoading(true);
          setShowNoCats(false);
          const res = await fetchSelectedCatImage(catId);
          const breedsBody: ISelectedBreed = {
            id: res.breeds[0].id,
            name: res.breeds[0].name,
            origin: res.breeds[0].origin,
            temperament: res.breeds[0].temperament,
            description: res.breeds[0].description,
          };
          setImageUrl(res.url);
          setSelectedBreed(res.breeds[0].id);
          setCatDetails(breedsBody);
          setIsLoading(false);
        }
      } catch (e) {
        console.log({ e });
        setIsLoading(false);
        setShowNoCats(true);
        setAlert({
          bodyMessage:
            'Apologies but we could not load new cats for you at this time! Miau!',
          show: true,
          variant: 'warning',
        });
      }
    },
    [catId, setSelectedBreed, setAlert],
  );

  useEffect(() => {
    fetchCatDetails();
  }, [fetchCatDetails]);

  const handleBack = () => {
    navigate(`/?breed=${selectedBreed}`);
  };

  const renderHeader = () => {
    return <Button onClick={() => handleBack()}>Back</Button>;
  };

  const renderBody = () => {
    return (
      <>
        <CardTitle as="h4">{catDetails.name}</CardTitle>
        <CardText as="h5">Origin: {catDetails.origin}</CardText>
        <CardText as="h6">{catDetails.temperament}</CardText>
        <CardText>{catDetails.description}</CardText>
      </>
    );
  };

  if (isLoading) {
    return (
      <StyledContainer>
        <Loading text="Loading..." />
      </StyledContainer>
    );
  }

  if (showNoCats) {
    return (
      <StyledContainer>
        {renderHeader()}
        <StyledMessage>Sorry, no cats were fetched...</StyledMessage>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <ImageCard
        imageUrl={imageUrl}
        header={renderHeader()}
        body={renderBody()}
      />
    </StyledContainer>
  );
};

export default Details;
