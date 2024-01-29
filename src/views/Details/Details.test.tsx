import { fireEvent, render, waitFor } from '@testing-library/react';

import '@testing-library/jest-dom';
import Details from './Details';
import { BrowserRouter } from 'react-router-dom';

// Mock axios
jest.mock('axios');

describe('Details view', () => {
  it('displays its contents', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Details />
      </BrowserRouter>,
    );

    const catDetails = getByTestId('cat-details');
    const backBtn = getByTestId('back-btn');

    await waitFor(() => {
      expect(catDetails).toBeInTheDocument();
      expect(backBtn).toBeInTheDocument();
    });
  });

  it('has a button that redirects to home', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Details />
      </BrowserRouter>,
    );

    const backBtn = getByTestId('back-btn');

    fireEvent.click(backBtn);

    await waitFor(() => {
      expect(window.location.href).toContain('/');
    });
  });
});
