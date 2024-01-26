import { FC, ReactNode } from 'react';
import {
  StyledCard,
  StyledCardBody,
  StyledCardHeader,
  StyledCardImage,
} from './styles';

interface ImageCardProps {
  imageUrl: string;
  body?: ReactNode;
  header?: ReactNode;
}

const ImageCard: FC<ImageCardProps> = ({ imageUrl, body, header }) => {
  return (
    <StyledCard>
      {header ? <StyledCardHeader>{header}</StyledCardHeader> : null}
      <StyledCardImage src={imageUrl} />
      {body ? <StyledCardBody>{body}</StyledCardBody> : null}
    </StyledCard>
  );
};

export default ImageCard;
