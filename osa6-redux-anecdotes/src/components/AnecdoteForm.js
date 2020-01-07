import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";
import { connect } from "react-redux";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = props => {
  const addAnecdote = async event => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    const newAnecdote = await anecdoteService.createNew(content);
    props.createAnecdote(newAnecdote);
    props.showNotification("You created '" + content + "'");
    setTimeout(() => {
      props.showNotification("");
    }, 5000);
  };

  return (
    <div>
      <h2>Create new anecdote</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

const connectedAnecdoteForm = connect(null, {
  createAnecdote,
  showNotification
})(AnecdoteForm);
export default connectedAnecdoteForm;
