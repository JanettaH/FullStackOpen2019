import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0])
  const [highestPoints, setHighestPoints] = useState(0)

  const getRandomIntInclusive = () => { setSelected(Math.floor(Math.random() * 5)); }

  const getMostVoted = points => {
      var max = highestPoints;
      var index = 0;
      for (var i = 0; i < points.length; i++) {
          if(points[i] > max) {
              max = points[i];
              index = i;
          }
      }
      setHighestPoints(index);
  }

  const vote = selected => () => {
    const pointsCopy = [...points];
    pointsCopy[selected] = pointsCopy[selected] + 1;
    setPoints(pointsCopy);
    getMostVoted(pointsCopy);
  };


  return (
    <div>
      {props.anecdotes[selected]}
      <div>
      <text>has {points[selected]} votes</text>
      <div>
    <button onClick={vote(selected)}>vote</button>
      <button onClick={getRandomIntInclusive}>next anecdote</button>
      </div>
      <h3>anecdote with most votes</h3>
      <div>{props.anecdotes[highestPoints]}</div>
      <text>has {points[highestPoints]} votes</text>
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)