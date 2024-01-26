import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { StyledDiv } from './styles';
import Loading from '../Loading/Loading';

export default function Layout() {
  return (
    <main>
      <Suspense fallback={<Loading text="Loading..." />}>
        <StyledDiv>
          {/* Apply header if needed */}
          <Outlet />
          {/* Apply footer if needed */}
        </StyledDiv>
      </Suspense>
    </main>
  );
}
