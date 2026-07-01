import { useState, useEffect } from 'react'
import anecdoteService from '../services/anecdotes'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const reset = () => {
        setValue('')
    }

    return {
        properties:
        {
            type,
            value,
            onChange,
        },
        functions:
        {
            reset
        }    
    }
}


export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([])

  useEffect(() => {
    anecdoteService.getAll().then(data => setAnecdotes(data))
  }, [])

  const addAnecdote = (anecdote) => {
    anecdoteService.createNew(anecdote).then(data => setAnecdotes(anecdotes.concat(data)))
  }

  const deleteAnecdote = (id) => {
    anecdoteService.removeAnecdote(id).then(() => {setAnecdotes(anecdotes.filter(a => a.id !== id))})
  }

  return {
    anecdotes,
    addAnecdote,
    deleteAnecdote
  }
}
