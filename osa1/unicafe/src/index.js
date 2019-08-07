import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const clickBad = () => {
    setBad(bad + 1)
  }
  
  const clickGood = () => {
    setGood(good + 1)
  }
  
  const clickNeutral = () => {
    setNeutral(neutral + 1)
  }


  return (
    <div>
      <Header text="give feedback"/>
      <Button handleClick={clickGood} name="good"/>
      <Button handleClick={clickNeutral} name="neutral"/>
      <Button handleClick={clickBad} name="bad"/>
      <Header text="statistics"/>
      {good + neutral + bad === 0 ? (
      <h3>No feedback given</h3>
      ) : (
        <div>
          <Parts good={good} neutral={neutral} bad={bad}/>
      </div>
      )
      }
    </div>
  );
};

const Parts = ({good, neutral, bad}) => {
  const allClicks = good + neutral + bad;
  const average = (good - bad) / allClicks;
  const positive = (good / allClicks) * 100 + " %";
  return ( 
    <div>
      <table>
        <tbody>
      <Part rating="good" amount={good}/>
      <Part rating="neutral" amount={neutral}/>
      <Part rating="bad" amount={bad}/>
      <Part rating="all" amount={allClicks}/>
      <Part rating="average" amount={average}/>
      <Part rating="positive" amount={positive}/>
      </tbody>
      </table>
    </div>
   );
}
 


const Header = ({text}) => {
  return ( 
    <div>
    <h1>
      {text}
    </h1>
    </div>
  );
}
const Part  = ({rating, amount}) => {
  return (
    <tr>
      <td>{rating}</td> <td>{amount}</td>
    </tr>
  );
}

const Button = ({handleClick, name}) => {
  return ( 
      <button onClick={handleClick}>{name}</button>
   );
}


ReactDOM.render(<App />, 
  document.getElementById('root')
)