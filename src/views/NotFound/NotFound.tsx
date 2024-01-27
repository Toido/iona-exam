import { StyledContainer } from 'src/styles';
import { StyledDiv, StyledImage, StyledText, Styledbutton } from './styles';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleButton = () => {
    navigate('/');
  };
  return (
    <StyledContainer>
      <StyledDiv>
        <StyledImage src="/404-image.jpg" />
        <StyledText>Oops, no cats can be seen on this page</StyledText>
        <Styledbutton onClick={handleButton}>Go to Home</Styledbutton>
      </StyledDiv>
    </StyledContainer>
  );
};

export default NotFound;
