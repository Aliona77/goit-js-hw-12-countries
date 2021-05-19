import countryData from '../templates/country_data.hbs';
import countrySearch from '../templates/coutry_search.hbs';
import debounce from 'lodash.debounce';
import {  error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { fetchCountries } from './fetchCountries_API';
import getRefs from './refs';

const refs = getRefs();

let searchQuery = '';

refs.search.addEventListener('input', debounce(onSearchCountry, 500));

function renderNumberCountries(countries) {
    if (countries.length > 10) {
        return error({text: " Too many matches found. Please enter a more specific query!"})
    }
    if (countries.length >= 2 && countries.length <= 10) {
        markupCountry(countries);
        return
    }
    markupCountryData(countries);
}
function markupCountry(countries) {
    const markupCountry = countrySearch(countries);
    refs.country.insertAdjacentHTML('afterbegin', markupCountry);
}

function markupCountryData(countries) {
    const markupData = countryData(countries);
    refs.country.insertAdjacentHTML('afterbegin', markupData);
}
function onSearchCountry() {
    refs.country.innerHTML = '';
    searchQuery = refs.search.value;
    fetchCountries(searchQuery)
        .then(renderNumberCountries)
        .catch(error=> console.log(error))
}