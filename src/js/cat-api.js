import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_DFj4gSN6S75s14sRPAM8T9OXF7l8YTyiNSxLqafGruuTWhPOIaRYo9UuF3VL0QAF';

export class CatApiService {

  BASE_URL = 'https://api.thecatapi.com/v1/';
  END_POINTS = {
    BREEDS: 'breeds',
    IMAGES_SEARCH: 'images/search',
  };

  fetchBreeds() {
    const url = `${this.BASE_URL}${this.END_POINTS.BREEDS}`;
    return axios.get(url);
  }

  fetchCatByBreed(breedId) {
    const url = `${this.BASE_URL}${
      this.END_POINTS.IMAGES_SEARCH
    }?breed_ids=${breedId}`;
    return axios.get(url);
  }
}
