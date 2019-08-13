import React from 'react';
import Contact from './contact';

const Contacts = ({persons, filter, deleteContact}) => {
    var filtered = persons.filter(person => person.name.toLowerCase().startsWith(filter.toLowerCase()))
    return filtered.map(person => <Contact contactObject={person} key={person.name} deleteContact={deleteContact}/>)
}
 
export default Contacts;