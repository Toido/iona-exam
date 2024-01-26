import { FC, ReactNode } from 'react';
import { Card, CardImg } from 'react-bootstrap';
import { StyledCardBody, StyledCardHeader } from './styles';

interface ImageCardProps {
  imageUrl: string;
  body?: ReactNode;
  header?: ReactNode;
}

const ImageCard: FC<ImageCardProps> = ({ imageUrl, body, header }) => {
  return (
    <Card>
      {header ? <StyledCardHeader>{header}</StyledCardHeader> : null}
      <CardImg src={imageUrl} />
      {body ? <StyledCardBody>{body}</StyledCardBody> : null}
    </Card>
  );
};

export default ImageCard;
