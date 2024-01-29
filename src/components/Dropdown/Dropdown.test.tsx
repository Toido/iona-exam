import { render, waitFor } from '@testing-library/react';

import '@testing-library/jest-dom';
import axios from 'axios';
import Dropdown from './Dropdown';
import { MOCKOPTIONS } from './Dropdown.mock';

// Mock axios
jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Dropdown component', () => {
  it('has a working dropdown select', async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: MOCKOPTIONS }),
    );
    const { getByTestId } = render(
      <Dropdown
        options={MOCKOPTIONS}
        onChange={() => {}}
        value="Select breed"
      />,
    );

    const select = getByTestId('dropdown') as HTMLSelectElement;

    select.value = 'aege';
    select.dispatchEvent(new Event('change'));

    await waitFor(() => {
      expect(select.value).toBe('aege');
    });
  });
});
