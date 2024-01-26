import { useContext, useEffect, useState } from 'react';
import { Button, CardText, CardTitle, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSelectedCatImage } from 'src/apis/cats';
import ImageCard from 'src/components/ImageCard/ImageCard';
import AppContext from 'src/contexts/AppContext';

type DetailsParams = {
  catId: string;
};

const Details = () => {
  const [imageUrl, setImageUrl] = useState('');
  const { setSelectedBreed, selectedBreed } = useContext(AppContext);
  const navigate = useNavigate();

  const { catId } = useParams<DetailsParams>();

  useEffect(() => {
    const fetchCatDetails = async () => {
      if (catId) {
        const res = await fetchSelectedCatImage(catId);
        const resData = res.data;
        const breedsBody = {
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
    };

    fetchCatDetails();
  }, [catId, setSelectedBreed]);

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
    <Container>
      <ImageCard
        imageUrl={imageUrl}
        header={renderHeader()}
        body={renderBody()}
      />
    </Container>
  );
};

export default Details;
