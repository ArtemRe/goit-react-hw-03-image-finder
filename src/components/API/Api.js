import axios from 'axios';
export async function fetchImages(searchQuery, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '29364351-4042f0090539e3343f354af9c';
  const PARAMS = `&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${page}`;
  const URL = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}${PARAMS}`;

  const response = await axios.get(URL);
  return response.data;
}
