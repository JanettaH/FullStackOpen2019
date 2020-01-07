const reducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_ANECDOTE":
      return state.concat(action.data);
    case "INIT_ANECDOTES":
      return action.data;
    case "VOTE":
      const id = action.data;
      const anecdoteToChange = state.find(a => a.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      };
      console.log(changedAnecdote);
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    default:
      return state;
  }
};

export const initializeAnecdotes = anecdotes => {
  return {
    type: "INIT_ANECDOTES",
    data: anecdotes
  };
};

export const createAnecdote = data => {
  return {
    type: "NEW_ANECDOTE",
    data
  };
};

export const voteAnecdote = anecdote => {
  return {
    type: "VOTE",
    data: anecdote
  };
};

export default reducer;
