import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { StyledDiv } from './styles';

export default function Layout() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <StyledDiv>
          {/* Apply header if needed */}
          <Outlet />
          {/* Apply footer if needed */}
        </StyledDiv>
      </Suspense>
    </main>
  );
}
