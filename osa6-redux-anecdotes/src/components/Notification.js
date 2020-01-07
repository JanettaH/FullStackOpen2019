import React from "react";
import { connect } from "react-redux";

const Notification = props => {
  console.log(props.notification);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1
  };
  const state = props.notification;
  if (state === "") {
    return null;
  }
  return <div style={style}>{props.notification}</div>;
};

const mapStateToProps = state => {
  return {
    notification: state.notification
  };
};
const ConnectedNotification = connect(mapStateToProps)(Notification);
export default ConnectedNotification;
