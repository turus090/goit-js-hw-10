import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';
import './css/styles.css';

let listCountries
const DEBOUNCE_DELAY = 300;

const renderListCountries = (list) => {
    console.log('it is list')
    console.table(list)
}
const renderOneCountry = (country) => {
    console.log('it is one country')
    console.log(country)
}
const renderToMuch = () =>{
    console.log('it is to many countries')
}
const renderNotFound = () => {
    console.log('it is not found')
}

const searchBox = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');
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
