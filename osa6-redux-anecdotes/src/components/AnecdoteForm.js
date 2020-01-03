import React from "react";

const AnecdoteForm = props => {
  const generateId = () => Number((Math.random() * 1000000).toFixed(0));
  const addAnecdote = event => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    props.store.dispatch({
      type: "NEW_ANECDOTE",
      data: {
        content,
        votes: 0,
        id: generateId()
      }
    });
    event.target.anecdote.value = "";
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
