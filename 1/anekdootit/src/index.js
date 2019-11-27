import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  console.log(points.slice())
  const highestPoints = points.indexOf(points.slice().sort((a,b) => b-a)[0])
  console.log(points.slice().sort((a,b) => a-b))
  console.log(highestPoints)
  const voteAnecdote = () => () => {
      const copy = [...points]
      copy[selected]++
      return setPoints(copy)
  }
  const getNextAnecdote = () => () => setSelected(Math.floor(Math.random()*anecdotes.length))

  return (
    <div>
        <h1>Anecdote of the day</h1>
        <div>
            {anecdotes[selected]}
        </div>
        <div>
            has {points[selected]} points
        </div>
        <button onClick={voteAnecdote()}>Vote</button>
        <button onClick={getNextAnecdote()}>Next anecdote</button>
        <h1>Anecdote with most votes</h1>
        <div>
            {anecdotes[highestPoints]}
        </div>
        <div>
            has {points[highestPoints]} points
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

