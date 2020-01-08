import React from "react";
import { Alert } from "react-bootstrap";

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

  return <div>{message && <Alert variant="success">{message}</Alert>}</div>;
};
export default Notification;
