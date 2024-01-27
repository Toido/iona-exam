import { FC } from 'react';
import { Button, ButtonProps, Image } from 'react-bootstrap';
import styled from 'styled-components';

export const StyledDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const StyledText = styled.h3`
  margin: 0px;
`;

export const StyledImage = styled(Image)`
  max-height: 400px;
`;

export const Styledbutton = styled(Button as FC<ButtonProps>)``;
