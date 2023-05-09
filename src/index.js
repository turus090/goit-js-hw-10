import debounce from 'lodash.debounce'
import fetchCountries from './fetchCountries';
import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio'
let listCountries

const countriesList =  document.querySelector('.country-list')
const countryInfo = document.querySelector('.country-info')
const DEBOUNCE_DELAY = 300;
const clearResult = () => {
    countryInfo.innerHTML = ''
    countriesList.innerHTML = ''
}
const renderListCountries = (list) => {
   
    list.forEach(country => {
        countriesList.innerHTML += `
        <li class="country-item">
            <img class="country-flag" src="${country.flags.svg}" alt="${country.flags.alt}">
            <p class="country-name">${country.name.official}</p>
        </li>
        `
        
    });
   
 
}
const renderOneCountry = (country) => {
    let languagesList = ''
    let languagesObj = country.languages
    for (let item in languagesObj) {
        languagesList += ` ${languagesObj[item]}`
    }
    
    countriesList.innerHTML = ''
    countryInfo.innerHTML = `
        <div class="countryMainInfo">
            <img class="country-flag" src="${country.flags.svg}" alt="${country.flags.alt}">
            <p class="country-name">${country.name.official}</p>
        </div>
        <p class="countryInfoItem"> 
        <span class = "text-bold">Capital:</span>
            ${country.capital.map((capital) => capital)}
        </p>
        <p class="countryInfoItem"> 
        <span class = "text-bold">Languages:</span>
            ${languagesList}
        </p>
        <p class="countryInfoItem"> 
        <span class = "text-bold">Population:</span>
            ${country.population}
        </p>
    `
   
}
const renderToMuch = () =>{
    Notify.info("Too many matches found. Please enter a more specific name.")
   
}
const renderNotFound = () => {
    
    Notify.info("Oops, there is no country with that name")
}

const handleInput = () => {
        clearResult()
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
}
const searchBox = document.querySelector('#search-box');
searchBox.addEventListener('input', ()=>setTimeout(debounce(handleInput,DEBOUNCE_DELAY),1000))
