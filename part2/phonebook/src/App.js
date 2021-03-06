import React, { useState, useEffect } from 'react'

import personService from './services/persons'

const Notification = ({ message, error }) => {
  if (message === null) {
    return null
  }

  const flag = error ? 'error' : 'success' //to determine if error message is green or red
  return (
    <div className={flag}>
      {message}
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>name: <input value={props.newName} onChange={event => props.setNewName(event.target.value)} /></div>
      <div>number: <input value={props.newNumber} onChange={event => props.setNewNumber(event.target.value)} /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Filter = (props) => {
  return (
    <>filter name: <input value={props.value} onChange={props.onChange} /></>
  )
}

const Person = ({ person, deletePerson }) => (
  <li>
    {person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button>
  </li>
)

const Persons = ({ persons, deletePerson }) => (
  <div>
    <h2>Numbers</h2>
    <ul>
      {persons.map(person => <Person key={person.name} person={person} deletePerson={deletePerson} />)}
    </ul>
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorFlag, setErrorFlag] = useState(true)

  useEffect(() => {
    personService.getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const changePersonNumber = (id) => {
    personService.update(id, { name: newName, number: newNumber })
      .then(personData => {
        if (personData === null) {
          setErrorFlag(true)
          setErrorMessage(`operation incomplete: ${newName} was removed by someone else`)
          setPersons(persons.filter(person => person.name !== newName))
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        } else {
          setErrorFlag(false)
          setErrorMessage(`${newName}'s number was changed`)
          setPersons(persons.map(person => person.name !== newName ? person : personData))
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }
      })
      .catch(error => {
        setErrorFlag(true)
        setErrorMessage(error.response.data.error)
        if (error.response.status === 404) {
          setPersons(persons.filter(person => person.name !== newName))
        }
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    return
  }

  const addPerson = event => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)) {
        const personId = persons.find(person => person.name === newName).id
        changePersonNumber(personId)
      }
    }
    else {
      const newPerson = { name: newName, number: newNumber }
      personService.create(newPerson)
        .then(personData => {
          setPersons(persons.concat(personData))
          setNewName('')
          setNewNumber('')
          setErrorFlag(false)
          setErrorMessage(`${newName} was added to the phonebook`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorFlag(true)
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const deletePerson = (person) => {
    if (window.confirm(`Are you sure you want to delete '${person.name}' from phonebook?`)) {
      personService.deletePersonId(person.id)
        .then(() => {
          let newPersons = persons.slice()
          newPersons.splice(persons.indexOf(person), 1)
          setPersons(newPersons)
        })
        .catch(error => {
          setPersons(persons.filter(p => p !== person))
        })
    }
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} error={errorFlag} />
      <Filter value={searchTerm} onChange={event => setSearchTerm(event.target.value)} />
      <PersonForm handleSubmit={addPerson} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} />
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App