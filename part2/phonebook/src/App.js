import React, { useState, useEffect } from 'react'
import axios from 'axios'

const PersonForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>name: <input value={props.newName} onChange={event => props.setNewName(event.target.value)}/></div>
      <div>number: <input value={props.newNumber} onChange={event => props.setNewNumber(event.target.value)}/></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Filter = (props) => {
  return (
    <input value={props.value} onChange={props.onChange} />
  )
}

const Person = ({person}) => (
  <p>{person.name} {person.number}</p> 
)

const Persons = ({persons}) => (
  <div>
  <h2>Numbers</h2>
   {persons.map(person => <Person key={person.name} person={person} />)}
  </div>
)

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchTerm, setSearchTerm ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = event => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName('')
      setNewNumber('')
    }
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchTerm} onChange={event => setSearchTerm(event.target.value)} />
      <PersonForm handleSubmit={addPerson} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} />
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App