import axios from 'axios';

const apiUrl = process.env.VITE_APP_API_URL;
const apiKey = process.env.VITE_API_KEY;

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': apiKey,
  },
});

export const fetchCatBreeds = async () => {
  const res = await api
    .get('/breeds')
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log({ error });
    });
  return res;
};

export const fetchCatImages = async (page: number, breedId: string) => {
  const res = await api
    .get(
      `/images/search?page=${page}&limit=10&breed_id=${breedId}&include_breeds=false`,
    )
    .then(response => {
      return response.data;
    })
    .catch(error => console.log({ error }));
  return res;
};

export const fetchSelectedCatImage = async (imageId: string) => {
  const res = await api
    .get(`/images/${imageId}`)
    .then(response => {
      return response.data;
    })
    .catch(error => console.log({ error }));
  return res;
};
