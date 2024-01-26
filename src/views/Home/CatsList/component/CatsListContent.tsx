import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ICatDetails } from 'src/@types/AppTypes';
import ImageCard from 'src/components/ImageCard/ImageCard';
import { StyledCol } from '../styles';

const CatsListContent = ({ catList }: { catList: ICatDetails[] }) => {
  const navigate = useNavigate();

  const handleViewDetail = (id: string) => {
    navigate(`/${id}`);
  };

  const renderButton = (id: string) => {
    return <Button onClick={() => handleViewDetail(id)}>View Details</Button>;
  };

  if (catList.length === 0) {
    return (
      <Row>
        <StyledCol>No cats available</StyledCol>
      </Row>
    );
  }

  return (
    <Row>
      {catList.map((cat, index) => {
        return (
          <Col key={index} xs={12} sm={6} md={4} lg={3}>
            <ImageCard imageUrl={cat.url} body={renderButton(cat.id)} />
          </Col>
        );
      })}
    </Row>
  );
};

export default CatsListContent;
