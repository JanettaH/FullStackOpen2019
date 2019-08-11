import React, { useState } from 'react'
import Filter from './components/filter'
import Contacts from './components/contacts';

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')


  const addContact = (event) => {
    event.preventDefault()
    const contactObject = {
      name: newName,
      number: newNumber
    }
    var found = persons.find(person => person.name === newName)
    if(found) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      return
    }
    setPersons(persons.concat(contactObject))
    setNewName('')
    setNewNumber('')
    }


    const handleContactChange = (event) => {
      setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
    }

    const filter = value => {
      setNewFilter(value)
      console.log(value)
    }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter}/>
      <form onSubmit={addContact}>
        <div>
          name: 
          <input
          value={newName}
          onChange={handleContactChange} />
          </div>
          <div>
          number: 
          <input
          value={newNumber}
          onChange={handleNumberChange} /><button type="submit">add</button>
          </div>
        
          
      </form>
      <h2>Numbers</h2>
      <div>
          <Contacts persons={persons} filter={newFilter}/>
        </div>
    </div>
  )

}

export default App
