import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0)
  const getRandom = () => Math.floor(Math.random() * anecdotes.length - 1) + 1

  const handleVote = () => {    
    const copy = [...votes]
    copy[selected]++
    setVotes(copy)
    console.log(copy)
    getMostVoted(copy)
  }

  const handleSelected = () =>{
    setSelected(getRandom())
  }

  const getMostVoted = (array) => {
    const maximum = array.indexOf(Math.max(...array))
    console.log(maximum)
    setMostVoted(maximum)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>A wise man once said: {anecdotes[selected]}</p>
      <p>Votes: {votes[selected]}</p>
      
      <button onClick = {handleVote}>Vote</button>
      <button nodeonClick = {handleSelected}>Next Anecdote</button>

      <h1>Most voted anecdote</h1>
      <p>A wise man once said: {anecdotes[mostVoted]}</p>
    </div>
  )
}

export default App