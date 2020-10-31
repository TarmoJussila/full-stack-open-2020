import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Statistics = (props) => {
  if (props.good + props.neutral + props.bad === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <tr><StatisticLine value={props.good} text="Good" /></tr>
          <tr><StatisticLine value={props.neutral} text="Neutral" /></tr>
          <tr><StatisticLine value={props.bad} text="Bad" /></tr>
          <tr><StatisticLine value={props.good + props.neutral + props.bad} text="All" /></tr>
          <tr><StatisticLine value={(props.good - props.bad) / (props.good + props.neutral + props.bad)} text="Average" /></tr>
          <tr><StatisticLine value={(props.good / (props.good + props.neutral + props.bad)) * 100} text="Positive" suffix="%" /></tr>
        </tbody>
      </table>
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  if (isNaN(props.value)) {
    return (
      <>
        <td>{props.text}</td>
        <td>?</td>
      </>
    )
  }

  return (
    <>
      <td>{props.text}</td>
      <td>{props.value} {props.suffix}</td>
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)