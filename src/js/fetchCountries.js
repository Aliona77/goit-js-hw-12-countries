import countryData from '../templates/country-data.hbs';
import getRefs from './refs.js';
import debounce from 'lodash.debounce';
import fetchCountriesApi from './fetchCountries-api.js';

import { info, error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/confirm/dist/PNotifyConfirm.css";

const refs = getRefs();

let searchQuery = '';

refs.input.addEventListener(
    'input',
    debounce(()=> {
        onInput();
    }, 500),
);
function onInput() {
    searchQuery = refs.input.value;

    console.log(searchQuery);
    if (!searchQuery) {
        clearCountriesMarkup();
        return;
    }

    fetchCountriesApi.fetchCountries(searchQuery)
        .then(renderNumberOfCountries)
        .catch(onError)
}


function renderNumberOfCountries(countries) {
    if (countries.length > 10) {
        clearCountriesMarkup();
        toManyMatches();
    }
    else if (countries.length <= 10 && countries.length > 1 ) {
      clearCountriesMarkup();
      renderCountriesMarkup(countryData, countries);
    }
    else if (countries.length === 1 ){
        clearCountriesMarkup();
        renderCountriesMarkup(countryData, countries[0]);
    }
    else {
        clearCountriesMarkup();
        noMatches();
    }
}

function renderCountriesMarkup(template, countries) {
    const markup = template(countries);
    refs.card.insertAdjacentHTML('beforeend', markup);
}

function clearCountriesMarkup() {
    refs.card.innerHTML = ''; 
}

function noMatches() {
    info({
        text: 'No matches!!!',
        delay: 1000,
    });   
}
function toManyMatches() {
    error({
        text: 'There are a lot of coincidences. Please specify your request!',
        delay: 3000, 
    });
}

function onError(error) {
    clearCountriesMarkup();
    console.log(error);
}

