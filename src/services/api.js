import axios from 'axios';
export default class API {
  constructor() {
    this.api_key = '5018958-ed49ccd90878e6614abdf24a6';
    this.api_url = 'https://pixabay.com/api/';
    this.api_type = 'image_type=photo';
    this.api_orientation = 'orientation=horizontal';
    this._searchQuery = '';
    this._page = 1;
  }

  get searchQuery() {
    return this._searchQuery;
  }

  set searchQuery(value) {
    return (this._searchQuery = value);
  }

  get page() {
    return this._page;
  }

  set page(value) {
    return (this._page += value);
  }

  resetPage() {
    return (this._page = 1);
  }

  async search() {
    let url = `${this.api_url}?${this.api_type}&${this.api_orientation}&q=${this.searchQuery}&page=${this._page}&per_page=12&key=${this.api_key}
`;
    try {
      const result = await axios.get(url);
      const data = result.data;
      return data;
    } catch (error) {
      return error.message;
    }
  }
}
