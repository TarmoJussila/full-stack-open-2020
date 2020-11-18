import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const filteredCountries = newFilter.length === 0
    ? countries
    : countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))
  
  return (
    <div>
      <h2>Country finder</h2>
      <Filter filterValue={newFilter} onFilterChange={handleFilterChange} />
      <CountryList countries={filteredCountries} />
    </div>
  )
}

const CountryList = ({ countries }) => {
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
          <CountryDetail key={country.name} country={country} />
        )}
      </div>
    )
  }

  return (
    <div>
      {countries.map(country =>
        <Country key={country.name} country={country} />
      )}
    </div>
  )
}

const Country = ({ country }) => {
  return (
    <div>
      <p>{country.name}</p>
    </div>
  )
}

const CountryDetail = ({ country }) => {
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
      <img src={country.flag} alt={country.name} width="100" />
    </div>
  )
}

const Filter = (props) => {
  return (
    <div>
      Find countries: <input value={props.filterValue} onChange={props.onFilterChange} />
    </div>
  )
}

export default App