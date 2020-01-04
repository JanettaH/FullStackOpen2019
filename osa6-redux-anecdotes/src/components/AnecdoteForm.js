import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteForm = props => {
  const generateId = () => Number((Math.random() * 1000000).toFixed(0));
  const addAnecdote = event => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    props.store.dispatch(createAnecdote(content));
    props.store.dispatch(showNotification("You created '" + content + "'"));
    setTimeout(() => {
      props.store.dispatch(showNotification(""));
    }, 5000);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
