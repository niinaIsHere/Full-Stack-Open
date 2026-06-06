import { useAnecdotes, useAnecdoteActions } from '../store'

const AnecdoteList = () => {
    const anecdotes = useAnecdotes()
    const anecdotesSorted = anecdotes.toSorted((a, b) => b.votes-a.votes)
    const { vote } = useAnecdoteActions()

    const voteAnecdote = id => {
        console.log('vote', id)
        vote(id)
    }

    return (
        <div>
        {anecdotesSorted.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      </div>
    )
}

export default AnecdoteList
