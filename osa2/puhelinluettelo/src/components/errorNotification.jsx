import React from 'react';

const styles = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

const ErrorNotification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="message" style={styles}>
        {message}
      </div>
    )
  }
  export default ErrorNotification;