import React from "react";

const styles = {
  color: "green",
  background: "lightgrey",
  fontSize: 20,
  borderStyle: "solid",
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
};

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className="message" style={styles}>
      {message}
    </div>
  );
};
export default Notification;
