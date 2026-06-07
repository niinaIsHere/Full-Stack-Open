import { useAnecdoteActions } from '../store'
import anecdoteService from '../services/anecdotes'

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

const AnecdoteForm = () => {
    const { add } = useAnecdoteActions()

    const addAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    const newAnecdote = await anecdoteService.createNew(content)
    add(newAnecdote)
    e.target.reset()
    }

    return (
        <form onSubmit={addAnecdote}>
        <div>
            <input name='anecdote'/>
        </div>
        <button type='submit'>create</button>
        </form>
    )
}

export default AnecdoteForm