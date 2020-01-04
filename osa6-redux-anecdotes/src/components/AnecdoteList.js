import React from "react";
import { showNotification } from "../reducers/notificationReducer";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = props => {
  const anecdotes = props.store.getState().anecdotes;
  const sortedAnecdotes = anecdotes.sort(function(a, b) {
    return b.votes - a.votes;
  });

  const vote = anecdote => () => {
    props.store.dispatch(voteAnecdote(anecdote.id));
    props.store.dispatch(showNotification(anecdote.content));
  };
  return (
    <div>
      {sortedAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
