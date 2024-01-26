import { CardBody, CardHeader } from 'react-bootstrap';
import styled from 'styled-components';

export const StyledCardHeader = styled(CardHeader)`
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  background-color: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
`;

export const StyledCardBody = styled(CardBody)`
  flex: 1 1 auto;
  padding: 1.25rem;
`;
