import axios from 'axios';
import { fetchCatBreeds, fetchCatImages, fetchSelectedCatImage } from './cats';
import { waitFor } from '@testing-library/dom';
import {
  MOCK_FETCHCATBREEDS_RESPONSE,
  MOCK_FETCHCATIMAGES_RESPONSE,
  MOCK_FETCHSELECTEDCATIMAGE_RESPONSE,
} from './cats.mock';

jest.mock('axios', () => {
  return {
    create: jest.fn(() => axios),
    get: jest.fn(() => Promise.resolve()),
  };
});

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Test apis', () => {
  it('fetches successfully data from fetchCatBreeds()', async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: MOCK_FETCHCATBREEDS_RESPONSE }),
    );

    await waitFor(() => {
      expect(fetchCatBreeds()).resolves.toEqual(MOCK_FETCHCATBREEDS_RESPONSE);
    });
  });

  it('fetches successfully data from fetchCatImages()', async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: MOCK_FETCHCATIMAGES_RESPONSE }),
    );

    await waitFor(() => {
      expect(fetchCatImages(1, 'abys')).resolves.toEqual(
        MOCK_FETCHCATIMAGES_RESPONSE,
      );
    });
  });

  it('fetches successfully data from fetchSelectedCatImage()', async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: MOCK_FETCHSELECTEDCATIMAGE_RESPONSE }),
    );

    await waitFor(() => {
      expect(fetchSelectedCatImage('abys')).resolves.toEqual(
        MOCK_FETCHSELECTEDCATIMAGE_RESPONSE,
      );
    });
  });
});
