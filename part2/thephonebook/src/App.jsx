import { useState } from 'react'

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

const Persons = (props) => {
  return (
    <ul>
      {props.list.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '0404040'
     }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (nameExists(newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else if (numberExists(newNumber)) {
      alert(`${newNumber} is already added to phonebook`)
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))}
    setNewName('')
    setNewNumber('')
  }

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
      <Persons list={listShow}/>
    </div>
  )
}

export default App
