import React from "react";
import { showNotification } from "../reducers/notificationReducer";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = props => {
  const { anecdotes, filter } = props.store.getState();
  const sortedAnecdotes = anecdotes.sort(function(a, b) {
    return b.votes - a.votes;
  });

  const vote = anecdote => () => {
    props.store.dispatch(voteAnecdote(anecdote.id));
    props.store.dispatch(
      showNotification("You voted '" + anecdote.content + "'")
    );
    setTimeout(() => {
      props.store.dispatch(showNotification(""));
    }, 5000);
  };
  return (
    <div>
      <br />
      {sortedAnecdotes
        .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={vote(anecdote)}>Vote</button>
            </div>
            <br />
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
