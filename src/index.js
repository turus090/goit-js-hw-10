import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';
import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio'
let listCountries
const countriesList =  document.querySelector('.country-list')
const countryInfo = document.querySelector('.country-info')
const DEBOUNCE_DELAY = 300;

const renderListCountries = (list) => {
    countryInfo.innerHTML = ''
    countriesList.innerHTML = ''
    list.forEach(country => {
        countriesList.innerHTML += `
        <li class="country-item">
            <img class="country-flag" src="${country.flags.svg}" alt="${country.flags.alt}">
            <p class="country-name">${country.name.official}</p>
        </li>
        `
        
    });
    console.log('it is list')
    console.table(list)
}
const renderOneCountry = (country) => {
    countriesList.innerHTML = ''

    console.log('it is one country')
    console.log(country)
}
const renderToMuch = () =>{
    Notify.info("Too many matches found. Please enter a more specific name.")
    console.log('it is to many countries')
}
const renderNotFound = () => {
    console.log('it is not found')
    Notify.info("Oops, there is no country with that name")
}

const searchBox = document.querySelector('#search-box');
searchBox.addEventListener('input', debounce(() =>{
    fetchCountries(searchBox.value.trim())
    .then(res => {
        if (res.status == 404){
            return []
        } else { 
            return res.json()
        }
    })
    .then(data => {
        if (data.length == 0){
            renderNotFound()
        }
        if (data.length > 10){
            renderToMuch()
        }
        if (data.length == 1){
            renderOneCountry(data[0])
        }
        if (data.length >= 2 && data.length <= 10){
            renderListCountries(data)
        }
    })
}), DEBOUNCE_DELAY)
