import { fireEvent, render, waitFor } from '@testing-library/react';
import CatsList from './CatsList';

import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import AppContext from 'src/contexts/AppContext';
import { fetchCatImages } from 'src/apis/cats';
import { ISelectedBreed } from 'src/@types/AppTypes';

// Mock axios
jest.mock('axios');

jest.mock('src/apis/cats');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Cats List view', () => {
  it('renders initial content', async () => {
    mockedAxios.get.mockResolvedValue({ data: 'Select breed' });

    const { getByTestId } = render(
      <BrowserRouter>
        <CatsList
          setAlert={() => {}}
          selectedBreed="abys"
          setSelectedBreed={() => {}}
        />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(getByTestId('catslist')).toBeInTheDocument();
      expect(getByTestId('catslist-btn')).toBeInTheDocument();
    });
  });

  it('has a working button', async () => {
    const mockResult: ISelectedBreed = {
      id: 'abys',
      name: 'Abyssinian',
      origin: 'Egypt',
      temperament: 'Active, Energetic, Independent, Intelligent, Gentle',
      description:
        'The Abyssinian is easy to care for, and a joy to have in your home. They’re affectionate cats and love both people and other animals.',
    };
    mockedAxios.get.mockResolvedValue({ data: 'abys' });

    const mockedProviderValue = {
      search: {
        page: 1,
      },
      selectedBreed: 'abys',
      setSelectedBreed: () => {},
      setSearch: () => {},
    };

    const { getByTestId } = render(
      <BrowserRouter>
        <AppContext.Provider value={{ ...mockedProviderValue }}>
          <CatsList
            setAlert={() => {}}
            selectedBreed=""
            setSelectedBreed={() => {}}
          />
        </AppContext.Provider>
      </BrowserRouter>,
    );

    const button = getByTestId('catslist-btn');

    fireEvent.click(button);
    (fetchCatImages as jest.Mock).mockResolvedValue({
      data: mockResult,
    });
    await waitFor(() => {
      expect(fetchCatImages).toHaveBeenCalled();
    });
  });
});
