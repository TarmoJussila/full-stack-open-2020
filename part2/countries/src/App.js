import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [ countries, setCountries] = useState([])
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
      <h3>Country list</h3>
      <CountryList countries={filteredCountries} />
    </div>
  )
}

const CountryList = ({ countries }) => {
  return (
    <div>
      {countries.map(country =>
        <p key={country.name}>
          {country.name} {country.number}
        </p>
      )}
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