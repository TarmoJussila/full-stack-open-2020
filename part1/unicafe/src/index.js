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
      <Display value={props.good} text="Good" />
      <Display value={props.neutral} text="Neutral" />
      <Display value={props.bad} text="Bad" />
      <Display value={props.good + props.neutral + props.bad} text="All" />
      <Display value={(props.good - props.bad) / (props.good + props.neutral + props.bad)} text="Average" />
      <Display value={(props.good / (props.good + props.neutral + props.bad)) * 100} text="Positive" suffix="%" />
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Display = (props) => {
  if (isNaN(props.value)) {
    return (
      <div>
        {props.text} ?
      </div>
    )
  }

  return (
    <div>
      {props.text} {props.value} {props.suffix}
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)