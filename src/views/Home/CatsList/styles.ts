import { FC } from 'react';
import { Button, ButtonProps, Card, Col } from 'react-bootstrap';
import styled from 'styled-components';

export const StyledCard = styled(Card)`
  max-height: 261px;
`;

export const StyledButton = styled(Button as FC<ButtonProps>)`
  color: #fff;
  background-color: #28a745;
  border-color: #28a745;
`;

export const StyledCol = styled(Col)`
  margin-bottom: 20px;
`;
