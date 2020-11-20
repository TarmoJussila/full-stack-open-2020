import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      window.alert(`The name ${newName} is already added to the phonebook!`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        console.log('promise fulfilled')
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          console.log(`Deleted ${name} with id ${id}`)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const filteredPersons = newFilter.length === 0
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={newFilter} onFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm onSubmit={addPerson} nameValue={newName} numberValue={newNumber} onNameChange={handleNameChange} onNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <PersonList persons={filteredPersons} onDeletePerson={deletePerson} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        Name: <input value={props.nameValue} onChange={props.onNameChange} />
      </div>
      <div>
        Number: <input value={props.numberValue} onChange={props.onNumberChange} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

const PersonList = ({ persons, onDeletePerson }) => {
  return (
    <div>
      {persons.map(person =>
        <Person key={person.name} person={person} onDeletePerson={onDeletePerson} />
      )}
    </div>
  )
}

const Person = ({ person, onDeletePerson }) => {
  const handleDeletePerson = () => {
    onDeletePerson(person.id, person.name)
  }

  return (
    <div>
      <p>
        {person.name} {person.number} {' '}
        <input type="submit" value="Delete" onClick={handleDeletePerson} />
      </p>
    </div>
  )
}

const Filter = (props) => {
  return (
    <div>
      Filter shown with: <input value={props.filterValue} onChange={props.onFilterChange} />
    </div>
  )
}

export default App