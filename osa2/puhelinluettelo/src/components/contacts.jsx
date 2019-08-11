import React from 'react';
import Contact from './contact';

const Contacts = ({persons, filter}) => {
    var filtered = persons.filter(person => person.name.toLowerCase().startsWith(filter.toLowerCase()))
    return filtered.map(person => <Contact contactObject={person} key={person.name}/>)
}
 
export default Contacts;