import { StyledDiv, StyledP, StyledSpinner } from './styles';

const Loading = ({ text }: { text: string }) => {
  return (
    <StyledDiv>
      <StyledSpinner animation="border" size="sm" />
      <StyledP>{text}</StyledP>
    </StyledDiv>
  );
};

export default Loading;
