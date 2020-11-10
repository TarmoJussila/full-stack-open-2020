import React from 'react'

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
      <h2>
        {props.course}
      </h2>
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
      <b>
        Total of {total} exercises
      </b>
    </>
  )
}

export default Course