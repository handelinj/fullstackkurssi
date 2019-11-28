import React from 'react';

const Header = (props) => {
    return (
        <h1>{props.course.name}</h1>
    )
}
const Part = (props) => {
    return (
        <p>{props.part} {props.exercises}</p>
    )
}
const Content = (props) => {

    const parts = () => props.parts.map(part => 
        <Part key={part.id} part={part.name} exercises={part.exercises}/>
      )
    return (
        <>
        {parts()}
        </>
    )
}
const Total = (props) => {
    const total = props.parts.reduce( (sum, part) => {
       return  (typeof(sum) == 'number' ? sum : sum.exercises) + part.exercises
      })
    return (
        <p>yhteensä {total} tehtävää</p>
    )
}
const Course = (props) => {
  return (
    <>
      <Header course={props.course}/>
      <Content parts={props.course.parts}/>
      <Total parts={props.course.parts}/>
    </>
  )
}
export default Course