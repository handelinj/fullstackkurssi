import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Filter = (props) => {
  const handleFilterOnChange = (e) => {
    props.setFilterString(e.target.value)
  }
    return (
      <div>
        <form>
          <div>
            find countries: <input value={props.filterString} onChange={handleFilterOnChange}/>
          </div>
        </form>
      </div>
    )
}
const CountryInformation = (props) => {
  const filteredCountries = 
  props.countries.filter(country => 
  country.name.toUpperCase().includes(props.filterString.toUpperCase()))
  
  if(props.filterString === '') 
    return <div></div>
  if(filteredCountries.length === 1) {
    const country = filteredCountries[0]
    props.setCapital(country.capital)
    return (
      <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>Languages:</h3>
      <ul>
      {country.languages.map(language => 
          <li key={language.name}>{language.name}</li>
        )}
      </ul>
      <img src={country.flag} alt={country.name} style={{width: 200 + 'px'}}></img>
      <h3>Weather in {country.capital}</h3>
        <p><b>Temperature: </b> {props.weather.current.temp_c} Celsius</p>
        <img src={props.weather.current.condition.icon} alt={'Weather'}/>
        <p><b>wind: </b> {props.weather.current.wind_kph} kph direction {props.weather.current.wind_dir}</p> 
      </div>  
    )
  }
  if(filteredCountries.length < 10) {
    const onCountryButtonClick = (name) => () => {
      props.setFilterString(name)
    }
    return (
      filteredCountries.map(country => 
          <div key={country.alpha2Code}>
            {country.name}
            <button onClick={onCountryButtonClick(country.name)}>show</button>
          </div>
        )
    )
  }
  else return <p>Too many countries</p>
}

function App() {
  const [countries, setCountries] = useState([])
  const [filterString, setFilterString] = useState('')
  const [weather, setWeather] = useState([])
  const [capital, setCapital] = useState('Paris')
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
      })
  }, [])
  useEffect(() => {
    axios
      .get('http://api.apixu.com/v1/current.json?key=08928cde66a8413e96e142758193005&q='+capital)
      .then(response => {
        console.log(response.data)
        setWeather(response.data)
      })
  }, [capital])
  return (
    <div>
      <Filter setFilterString={setFilterString} filterString={filterString}/>
      <CountryInformation 
      filterString={filterString}
      setFilterString={setFilterString}
      countries={countries}
      setWeather={setWeather}
      weather={weather}
      setCapital={setCapital}
      />
    </div>
  );
}

export default App;
