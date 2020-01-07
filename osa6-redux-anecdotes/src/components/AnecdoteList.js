import React from "react";
import { showNotification } from "../reducers/notificationReducer";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { connect } from "react-redux";

const AnecdoteList = props => {
  const { anecdotes } = props;

  const vote = anecdote => () => {
    props.voteAnecdote(anecdote.id);
    props.showNotification("You voted '" + anecdote.content + "'");
    setTimeout(() => {
      props.showNotification("");
    }, 5000);
  };
  return (
    <div>
      <br />
      {anecdotes.map(anecdote => (
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

const anecdoteToShow = ({ anecdotes, filter }) => {
  return anecdotes
    .sort((a, b) => b.votes - a.votes)
    .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()));
};

const mapStateToProps = state => {
  return {
    anecdotes: anecdoteToShow(state),
    filter: state.filter,
    notification: state.notification
  };
};

const mapDispatchToProps = {
  voteAnecdote,
  showNotification
};

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
export default ConnectedAnecdotes;
