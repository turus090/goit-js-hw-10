
const fetchCountries = (name) => {
    const url =`https://restcountries.com/v3.1/name/${name}?fields=name,flags,capital,population,languages`

    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,flags,capital,population,languages`)
    
}

export default fetchCountries