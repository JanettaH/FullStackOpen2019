import React, { useState, useEffect } from 'react'
import Filter from './components/filter'
import Contacts from './components/contacts';
import contactService from './services/contactService'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    contactService.getAll().then(contact => {
      setPersons(contact)
      console.log(contact)
    });
  }, []);

  const deleteContact = (id) => {
    let person = persons.find(person => person.id === id)
    let deleteContact = window.confirm("Delete" + person.name + "?")
    if(deleteContact === true){
    contactService.deleteContact(id).then(returned => {
      setPersons(persons.filter(contact => contact.id !== id))
    })
  }
  }

  const addContact = (event) => {
    event.preventDefault()
    let person = persons.find(person => person.name === newName)
    if(person !== undefined) {
      let updateContact = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      
      if(updateContact === true) {
        const changedContact = { ...person, number: newNumber}
        contactService.update(person.id, changedContact).then(returned => {
          setPersons(persons.map(person => person.id !== returned.id ? person : returned))
        })
      setNewName('')
      setNewNumber('')
      return
    }
  }    
  const contactObject = {
      name: newName,
      number: newNumber
    }
    contactService.create(contactObject).then(returned => {setPersons(persons.concat(returned))});
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
          <Contacts persons={persons} filter={newFilter} deleteContact={deleteContact}/>
        </div>
    </div>
  )

}

export default App
