import React, { useState, useEffect } from 'react'
import Filter from './components/filter'
import Contacts from './components/contacts';
import axios from 'axios'

const App = () => {
  const [ persons, setPersons] = useState([
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'contacts')


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
