import { render } from '@testing-library/react';
import Home from './Home';

import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

// Mock axios
jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Home view', () => {
  it('renders initial content', async () => {
    mockedAxios.get.mockResolvedValue({ data: 'Select breed' });
    const { getByText } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );

    const homeLabel = getByText('Cat Browser');
    expect(homeLabel).toBeInTheDocument();
  });
});
