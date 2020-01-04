import React from "react";

const Notification = ({ store }) => {
  console.log(store.getState().notification);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1
  };
  const state = store.getState().notification;
  if (state === "") {
    return null;
  }
  return <div style={style}>{store.getState().notification}</div>;
};

export default Notification;
