import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  console.log(response.data);
  return response.data;
};

const createNew = async content => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const voteAnecdote = async anecdote => {
  console.log(anecdote);
  const url = baseUrl + "/" + anecdote.id;
  const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
  const response = await axios.put(url, updatedAnecdote);
  return response.data;
};

export default { getAll, createNew, voteAnecdote };
