import React, { useState } from 'react'

const Button = ({text, handleClick}) => (
  <button onClick={handleClick}>{text}</button>
)

const MostVotes = ({anecdotes, votes}) => {
  let max = votes[0]
  let maxIndex = 0
  for (let i = 1; i < votes.length; ++i) {
    if (votes[i] > max) {
      max = votes[i]
      maxIndex = i
    }
  }

  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[maxIndex]}</p>
      <p>has {votes[maxIndex]} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0))

  const randInt = (min, max) => { // inclusive upper bound rand int
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const upvote = (selected) => {
    const copy = [ ...votes ]
    ++copy[selected]
    setVotes(copy)
  }

  console.log("rerendering...")

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button text="vote" handleClick={() => upvote(selected)} />
      <Button text="next anecdote" handleClick={() => setSelected(randInt(0, 5))} />
      <MostVotes anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App