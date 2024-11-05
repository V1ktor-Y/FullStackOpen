import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) =>(
  <tr>
    <td>{props.name}</td>
    <td>{props.stat}</td>
  </tr>
)

const Statistics = (props) => {
  if(props.total > 0) return(
    <div>
      <h1>Statistics</h1>
      <table>
        <StatisticLine name = 'Good reviews: ' stat = {props.good}/> 
        <StatisticLine name = 'Neutral reviews: ' stat = {props.neutral}/> 
        <StatisticLine name = 'Bad reviews: ' stat = {props.bad}/> 
        <StatisticLine name = 'Total reviews: ' stat = {props.total}/> 
        <StatisticLine name = 'Percentage positive: ' stat = {props.posPercent}/> 
        <StatisticLine name = 'Average review: ' stat = {props.average}/> 
      </table>
    </div>
  )
  else return(
    <p>No feedback given.</p>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleGood = () =>{
    const newGood = good + 1
    // console.log(newGood)
    setGood(newGood)
  }
  const handleNeutral = () =>{
    const newNeutral = neutral + 1
    // console.log(newNeutral)
    setNeutral(newNeutral)
  }
  const handleBad = () =>{
    const newBad = bad + 1
    // console.log(newBad)
    setBad(newBad)
  }

  const getTotal = () => good + bad + neutral;

  const getAverage = () => getTotal() > 0 ? (good - bad) / getTotal() : null;

  const getPositivePercent = () => getTotal() > 0 ? (good / getTotal()) * 100 : null;

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGood} text = 'Good'/>
      <Button handleClick={handleNeutral} text = 'Neutral'/>
      <Button handleClick={handleBad} text = 'Bad'/>

      <Statistics good = {good} neutral = {neutral} bad = {bad} total = {getTotal()} average = {getAverage()} posPercent = {getPositivePercent()}/>
    </div>
  )
}

export default App