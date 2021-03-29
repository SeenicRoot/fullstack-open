import React from 'react'

const Header = ({ name }) => {
  return (
    <h2>{name}</h2>
  )
}

const Total = ({ parts }) => {
  const sum = (accumulator, current) => accumulator + current
  
  return (
    <p><b>Number of exercises {parts.map(part => part.exercises).reduce(sum)}</b></p>
  )
}

const Parts = ({ parts }) => {
  return (
    parts.map(part => 
      <p key={part.id}>{part.name} {part.exercises}</p>
    )
  )
}

const Content = ({ course }) => {
  return (
    <div>
      <Parts parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <>
    <Header name={course.name} />
    <Content course={course} />
    </>
  )
}

export default Course