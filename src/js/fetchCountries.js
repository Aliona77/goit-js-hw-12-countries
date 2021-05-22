import countryData from '../templates/country-data.hbs';
import countryList from '../templates/country-cardList.hbs';
import getRefs from './refs';
import API from './fetchCountries-api.js';

import { info, error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/confirm/dist/PNotifyConfirm.css";
import debounce from 'lodash.debounce';

const refs = getRefs();
refs.inputForm.addEventListener(
    'input', debounce(()=> {
        onInput();
    }, 500));


function onInput(evt) {
    const searchQuery = refs.inputForm.value;

    API.fetchCountries(searchQuery)
        .then(checkNumberOfCountries)
        .catch(onFetchError)
}

function onFetchError() {
    error({
        title: "Error",
        text: 'No matches!!!',
        autoOpen: true,
        delay: 2000, 
    })
}

function renderCountriesMarkup(country) {
    console.log(country)
    const markUp = countryData(country[0]);
    refs.card.innerHTML = markUp;
}
function renderCountriesList(country) {
    const markUpList = countryList(country);
    refs.card.innerHTML = markUpList;
}

function checkNumberOfCountries(countries) {
    if (countries.length <= 10 && countries.length > 1) {
        clearMarkUp();
        renderCountriesList(countries);
        console.log(countries);
    }
    else if (countries.length === 1) {
        clearMarkUp();
        renderCountriesMarkup(countries);
    }
    else if (countries.length > 10) {
        clearMarkUp();
        info({
            title: "Error",
            text: 'There are a lot of coincidences. Please specify your request!',
            autoOpen: true,
            delay: 2000,
        })
    }
    else {
       clearMarkUp();
        onFetchError();
    }
}

function clearMarkUp() {
    refs.card.innerHTML = ""; 
}
