import { useAnecdoteActions } from '../store'

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

const AnecdoteForm = () => {
    const { add } = useAnecdoteActions()

    const addAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    add({ id: generateId(), content, votes: 0 })
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