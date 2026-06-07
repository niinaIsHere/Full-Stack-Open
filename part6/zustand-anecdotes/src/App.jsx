import { useEffect, useState } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import anecdoteService from './services/anecdotes'
import { useAnecdoteActions } from './store'

const App = () => {
  const { initialize } = useAnecdoteActions()
  const { deleteZero } = useAnecdoteActions()

  useEffect(() => {
    anecdoteService.getAll().then(anecdotes => initialize(anecdotes))
  }, [initialize])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter /> 
      <AnecdoteList />
      <AnecdoteForm />
      <button onClick={deleteZero}>Delete zero votes</button>
    </div>
  )
}

export default App
