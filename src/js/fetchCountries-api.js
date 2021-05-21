/*import axios from 'axios';

axios.defaults.baseURL = 'https://restcountries.eu/rest/v2/name';

export const fetchCountries = (searchQuery) => {
    return axios
        .get(`/${searchQuery}`)
        .then(response => response.data);
};*/
const BASE_URL = 'https://restcountries.eu/rest/v2/name';

const fetchCountries = countryName => fetch(`${BASE_URL}/${countryName}`).then(response => response.json());

export default {fetchCountries };