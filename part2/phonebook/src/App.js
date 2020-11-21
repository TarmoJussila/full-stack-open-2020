import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ successMessage, setSuccessMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        setErrorMessage(`Person data could not be received from the server!`)
        setTimeout(() => { setErrorMessage(null) }, 5000)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      if (window.confirm(`The name ${newName} is already added to the phonebook. Do you wish to replace the old number with a new one?`)) {
        const person = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
        const changedPerson = { ...person, number: newNumber }

        personService
          .update(changedPerson.id, changedPerson)
          .then(returnedPerson => {
            setSuccessMessage(`Person '${changedPerson.name}' was successfully updated!`)
            setTimeout(() => { setSuccessMessage(null)}, 5000)
            setPersons(persons.map(person => person.name.toLowerCase() !== newName.toLowerCase() ? person : returnedPerson))
          })
          .catch(error => {
            setErrorMessage(`Person '${changedPerson.name}' has been already removed from the server!`)
            setTimeout(() => { setErrorMessage(null) }, 5000)
            setPersons(persons.filter(person => person.id !== changedPerson.id))
          })
      }
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setSuccessMessage(`Person '${personObject.name}' was successfully added!`)
        setTimeout(() => { setSuccessMessage(null)}, 5000)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setErrorMessage(`Person '${personObject.name}' could not be added to the server!`)
        setTimeout(() => { setErrorMessage(null) }, 5000)
      })
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setSuccessMessage(`Person '${name}' was successfully deleted!`)
          setTimeout(() => { setSuccessMessage(null)}, 5000)
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          setErrorMessage(`Person '${name}' has been already removed from the server!`)
          setTimeout(() => { setErrorMessage(null) }, 5000)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const filteredPersons = newFilter.length === 0
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} isError={false} />
      <Notification message={errorMessage} isError={true} />
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
        <Person key={person.id} person={person} onDeletePerson={onDeletePerson} />
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

const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }

  if (!isError) {
    return (
      <div className="success">
        {message}
      </div>
    )
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

export default App