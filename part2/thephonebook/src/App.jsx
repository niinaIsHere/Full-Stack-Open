import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'


const Filter = (props) => {
  return (
  <form>
    <div>
      <input value={props.query} onChange={props.onChange}/>
    </div>
  </form>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        name: <input value={props.name} onChange={props.handleNameChange}/>
      </div>
      <div>
        number: <input value={props.number} onChange={props.handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ props, removePerson }) => {
  return (
    <ul>
      {props.map(person => 
      <li key={person.name}>
        {person.name} {person.number} <button onClick={() => removePerson(person.id)}>delete</button>
      </li>)}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')

  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
    }

  useEffect(hook, [])

  const removePerson = (id) => {
    const url = `http://localhost:3001/notes/${id}`
    const person = persons.find(n => n.id == id)
    const newpersons = persons.filter(n => n.id !== id)

    if (window.confirm('Delete ' + person.name)){
      personService
        .remove(id)
        setPersons(newpersons)
      }
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (numberExists(newNumber)) {
      alert(`${newNumber} is already added to phonebook`)
    }
    else if (nameExists(newName)) {
      const person = persons.find(n => n.name == newName)
      if (window.confirm(person.name + ' is already added to phonebook. Replace the old number with a new one?')){
        const personObject = {
          ...person,
          number: newNumber
        }
        personService
        .update(person.id, personObject)
        .then(updatedPerson => {setPersons(persons.map(p => p.id !== person.id ? p : updatedPerson))})
      }
    }

    else {
      const personObject = {
        name: newName,
        number: newNumber
      }

    personService
      .create(personObject)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
      })
  }}

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const searchPhonebook = (query) => persons.filter(person => Object.values(person).some(val => val.toLowerCase().includes(query.toLowerCase()))) 

  const nameExists = (props) => persons.some(person => person.name === props)
  const numberExists = (props) => persons.some(person => person.number === props)

  const results = searchPhonebook(query)
  const listShow = query ? results : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={query} onChange={(event) => setQuery(event.target.value)}/>
      <h2>add a new</h2>
      <PersonForm onSubmit={addPerson} name={newName} number={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons props={listShow} removePerson={removePerson}/>
    </div>
  )
}

export default App
