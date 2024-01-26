import { useContext, useEffect, useMemo, useState } from 'react';
import { Button, CardText, CardTitle } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ISelectedBreed } from 'src/@types/AppTypes';
import { fetchSelectedCatImage } from 'src/apis/cats';
import ImageCard from 'src/components/ImageCard/ImageCard';
import AppContext from 'src/contexts/AppContext';
import { StyledContainer } from 'src/styles';

type DetailsParams = {
  catId: string;
};

const Details = () => {
  const [imageUrl, setImageUrl] = useState('');
  const { setSelectedBreed, selectedBreed } = useContext(AppContext);
  const navigate = useNavigate();

  const { catId } = useParams<DetailsParams>();

  const fetchCatDetails = useMemo(
    () => async () => {
      if (catId) {
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
        setSelectedBreed(breedsBody);
      } else {
        // display error message
      }
    },
    [catId, setSelectedBreed],
  );

  useEffect(() => {
    fetchCatDetails();
  }, [fetchCatDetails]);

  const handleBack = () => {
    navigate(`/?breed=${selectedBreed.id}`);
  };

  const renderHeader = () => {
    return <Button onClick={() => handleBack()}>Back</Button>;
  };

  const renderBody = () => {
    return (
      <>
        <CardTitle as="h4">{selectedBreed.name}</CardTitle>
        <CardText as="h5">Origin: {selectedBreed.origin}</CardText>
        <CardText as="h6">{selectedBreed.temperament}</CardText>
        <CardText>{selectedBreed.description}</CardText>
      </>
    );
  };

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
