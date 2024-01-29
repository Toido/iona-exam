import { fireEvent, render, waitFor } from '@testing-library/react';
import CatsListContent from './CatsListContent';
import { BrowserRouter } from 'react-router-dom';
import { MOCKLIST } from './CatsListContent.mock';
import { act } from 'react-dom/test-utils';

describe('Cats list content component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });
  it('renders', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <CatsListContent catList={MOCKLIST} />
      </BrowserRouter>,
    );
    const catListRow = getByTestId('catslist-row');

    expect(catListRow).toBeInTheDocument();
  });

  it('has a button that will redirect to details view upon click', () => {
    const { getAllByTestId } = render(
      <BrowserRouter>
        <CatsListContent catList={MOCKLIST} />
      </BrowserRouter>,
    );
    const detailsBtns = getAllByTestId('details-btn');

    detailsBtns.forEach(detailsBtn => {
      expect(detailsBtn).toBeInTheDocument;
    });
  });

  it('has a functional button', async () => {
    const { getAllByTestId } = render(
      <BrowserRouter>
        <CatsListContent catList={MOCKLIST} />
      </BrowserRouter>,
    );
    const detailsBtns = getAllByTestId('details-btn');

    // trigger only on the first button
    await act(async () => {
      fireEvent.click(detailsBtns[0]);
    });

    await waitFor(() => {
      expect(window.location.href).toContain('/abys');
    });
  });
});
