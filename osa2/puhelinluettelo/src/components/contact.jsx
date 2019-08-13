import React from 'react';

const Contact = ({contactObject, deleteContact}) => {

    return (  <div>
        {contactObject.name} {contactObject.number}
        <button onClick={() => deleteContact(contactObject.id)}>delete</button>
    </div>);
}
 
export default Contact;