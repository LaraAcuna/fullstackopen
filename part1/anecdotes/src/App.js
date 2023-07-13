import { useState } from 'react'

const App = () => {

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }

  const generateRandomQuote = (quotes) => {
    setSelected(getRandomInt(quotes.length))
  }

  const vote = (quoteIndex) => {
    const copy = [...points]
    const topQuote = { ...mostVoted }
    copy[quoteIndex] += 1
    if (copy[quoteIndex] > topQuote.votes) {
      topQuote.index = quoteIndex;
      topQuote.votes = copy[quoteIndex];
      setMostVoted(topQuote);
    }
    setPoints(copy);
  }

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  const [selected, setSelected] = useState(0)

  const [mostVoted, setMostVoted] = useState({ index: 0, votes: 0 })

  return (
    <div>
      <h3>Anecdote of the day</h3>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={() => vote(selected)}>vote</button>
      <button onClick={() => generateRandomQuote(anecdotes)}>next anecdote</button>
      <h3>Anecdote with most votes</h3>
      <p>{anecdotes[mostVoted.index]}</p>
      <p>has {points[mostVoted.index]} votes</p>
    </div>
  )
}

export default App