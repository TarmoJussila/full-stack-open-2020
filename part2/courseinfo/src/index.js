import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

const Header = (props) => {
  return (
    <>
      <h1>
        {props.course}
      </h1>
    </>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part =>
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      )}
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.part} {props.exercises}
      </p>
    </>
  )
}

const Total = ({ parts }) => {
  const total = parts.map(part => part.exercises).reduce( (accumulator, currentValue) => {
    return accumulator + currentValue
  })

  return (
    <>
      <p>
        Number of exercises {total}
      </p>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))