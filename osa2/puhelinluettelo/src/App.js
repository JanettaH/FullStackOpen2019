import React, { useState, useEffect } from "react";
import Filter from "./components/filter";
import Contacts from "./components/contacts";
import contactService from "./services/contactService";
import Notification from "./components/notification";
import "./index.css";
import ErrorNotification from "./components/errorNotification";
import validateService from "./services/validateService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    contactService.getAll().then(contact => {
      setPersons(contact);
      console.log(contact);
    });
  }, []);

  const deleteContact = id => {
    let person = persons.find(person => person.id === id);
    let deleteContact = window.confirm("Delete" + person.name + "?");
    if (deleteContact === true) {
      contactService.deleteContact(id).then(returned => {
        setPersons(persons.filter(contact => contact.id !== id));
        setMessage("Deleted " + person.name);
        setTimeout(() => {
          setMessage(null);
        }, 4000);
      });
    }
  };

  const addContact = event => {
    event.preventDefault();
    if (!validateService.validatePerseon(newName, newNumber)) {
      setErrorMessage("Please fill out all required fields");
      setTimeout(() => {
        setErrorMessage(null);
      }, 4000);
      return;
    }
    let person = persons.find(person => person.name === newName);
    if (person !== undefined) {
      let updateContact = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (updateContact === true) {
        const changedContact = { ...person, number: newNumber };
        contactService
          .update(person.id, changedContact)
          .then(returned => {
            setPersons(
              persons.map(person =>
                person.id !== returned.id ? person : returned
              )
            );
            setMessage("Updated " + changedContact.name);
            setTimeout(() => {
              setMessage(null);
            }, 4000);
          })
          .catch(error => {
            setErrorMessage(
              "Information of " +
                changedContact.name +
                " has already been removed from server"
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 4000);
          });
      }
      setNewName("");
      setNewNumber("");
      return;
    }

    const contactObject = {
      name: newName,
      number: newNumber
    };
    contactService
      .create(contactObject)
      .then(returned => {
        setPersons(persons.concat(returned));
        setMessage("Created " + returned.name);
        setTimeout(() => {
          setMessage(null);
        }, 4000);
      })
      .catch(error => {
        setErrorMessage(error.response.data.error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 4000);
      });
    setNewName("");
    setNewNumber("");
  };

  const handleContactChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const filter = value => {
    setNewFilter(value);
    console.log(value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <ErrorNotification message={errorMessage} />
      <Filter filter={filter} />
      <form onSubmit={addContact}>
        <div>
          name:
          <input value={newName} onChange={handleContactChange} />
        </div>
        <div>
          number:
          <input value={newNumber} onChange={handleNumberChange} />
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <Contacts
          persons={persons}
          filter={newFilter}
          deleteContact={deleteContact}
        />
      </div>
    </div>
  );
};

export default App;
