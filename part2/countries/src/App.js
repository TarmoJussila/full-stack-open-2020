import React, { useState, useEffect } from 'react'
import axios from 'axios'

const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ newFilter, setNewFilter ] = useState('')
  const [ currentCountryInfo, setCountryInfo ] = useState({ countryName: '', cityName: '' })
  const [ cityWeather, setCityWeather ] = useState([])

  useEffect(() => {
    console.log('country effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('country promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    if (currentCountryInfo.cityName === '' || weatherApiKey === '') {
      return
    }
    console.log('weather effect')
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${currentCountryInfo.cityName}&appid=${weatherApiKey}`)
      .then(response => {
        console.log('weather promise fulfilled')
        setCityWeather(response.data)
      })
  }, [currentCountryInfo])

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const handleCountryInfoChange = (countryInfo) => {
    console.log(countryInfo)
    setCountryInfo(countryInfo)
    setNewFilter(countryInfo.countryName)
  }

  const filteredCountries = newFilter.length === 0
    ? countries
    : countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))
  
  return (
    <div>
      <h2>Country finder</h2>
      <Filter filterValue={newFilter} onFilterChange={handleFilterChange} />
      <CountryList countries={filteredCountries} cityWeather={cityWeather} onFilterChange={handleFilterChange} onShowWeather={handleCountryInfoChange} />
    </div>
  )
}

const CountryList = ({ countries, cityWeather, onFilterChange, onShowWeather }) => {
  if (countries.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter.</p>
      </div>
    )
  }
  
  if (countries.length === 1) {
    return (
      <div>
        {countries.map(country =>
          <CountryDetail key={country.name} country={country} cityWeather={cityWeather} onShowWeather={onShowWeather} />
        )}
      </div>
    )
  }

  return (
    <div>
      {countries.map(country =>
        <Country key={country.name} country={country} onFilterChange={onFilterChange} />
      )}
    </div>
  )
}

const Country = ({ country, onFilterChange }) => {
  return (
    <div>
      {country.name}
      {' '}
      <button type="submit" value={country.name} onClick={onFilterChange}>Show</button>
    </div>
  )
}

const CountryDetail = ({ country, cityWeather, onShowWeather }) => {
  const countryInfo = {
    countryName: country.name,
    cityName: country.capital
  }

  const handleShowWeather = () => {
    onShowWeather(countryInfo);
  }

  return (
    <div>
      <h3>{country.name}</h3>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h4>Languages</h4>
      {country.languages.map(language =>
        <li key={language.name}>
          {language.name}
        </li>
      )}
      <br />
      <img src={country.flag} alt={country.name} width="100" /><br /><br />
      <button type="submit" value={country.name} onClick={handleShowWeather}>Update weather</button>
      <Weather cityWeather={cityWeather} />
    </div>
  )
}

const Weather = ({ cityWeather }) => {
  if (cityWeather.length === 0) {
    return <p>No weather info</p>
  }

  const weatherInfo = {
    cityName: cityWeather.name,
    description: cityWeather.weather[0].description,
    temperature: cityWeather.main.temp,
    windSpeed: cityWeather.wind.speed,
    windDegree: cityWeather.wind.deg
  }

  return (
    <div>
      <h4>Weather in {weatherInfo.cityName}</h4>
      <b>Description:</b> {weatherInfo.description}<br />
      <b>Temperature:</b> {weatherInfo.temperature} K<br />
      <b>Wind:</b> {weatherInfo.windSpeed} m/s ({weatherInfo.windDegree} degrees)
    </div>
  )
}

const Filter = (props) => {
  return (
    <div>
      Find countries: <input value={props.filterValue} onChange={props.onFilterChange} />
      {' '}
      <button type="submit" value={''} onClick={props.onFilterChange}>Clear</button>
    </div>
  )
}

export default App