import React from 'react';

const Contact = ({contactObject}) => {
    return (  <div>
        {contactObject.name} {contactObject.number}
    </div>);
}
 
export default Contact;