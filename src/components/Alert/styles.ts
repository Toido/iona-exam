import { Alert } from 'react-bootstrap';
import styled from 'styled-components';

export const StyledAlert = styled(Alert)`
  position: fixed;
  bottom: 0;
  left: -100%;
  width: 100%;
  box-sizing: border-box;
  transition: left 0.3s ease-in-out;
  z-index: 1;
  max-width: 600px;

  &.show {
    left: 0;
  }
`;

export const StyledText = styled.p`
  margin-right: 4px;
  margin-bottom: 0px;
`;
