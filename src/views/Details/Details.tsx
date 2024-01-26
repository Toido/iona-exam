import { useContext, useEffect, useMemo, useState } from 'react';
import { Button, CardText, CardTitle } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ISelectedBreed } from 'src/@types/AppTypes';
import { fetchSelectedCatImage } from 'src/apis/cats';
import ImageCard from 'src/components/ImageCard/ImageCard';
import Loading from 'src/components/Loading/Loading';
import AppContext from 'src/contexts/AppContext';
import { StyledContainer } from 'src/styles';

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
  const { setSelectedBreed, selectedBreed } = useContext(AppContext);
  const navigate = useNavigate();

  const { catId } = useParams<DetailsParams>();

  const fetchCatDetails = useMemo(
    () => async () => {
      try {
        if (catId) {
          setIsLoading(true);
          const res = await fetchSelectedCatImage(catId);
          const resData = res.data;
          const breedsBody: ISelectedBreed = {
            id: resData.breeds[0].id,
            name: resData.breeds[0].name,
            origin: resData.breeds[0].origin,
            temperament: resData.breeds[0].temperament,
            description: resData.breeds[0].description,
          };
          setImageUrl(resData.url);
          setSelectedBreed(resData.breeds[0].id);
          setCatDetails(breedsBody);
          setIsLoading(false);
        }
      } catch (e) {
        console.log({ e });
        setIsLoading(false);
      }
    },
    [catId, setSelectedBreed],
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
