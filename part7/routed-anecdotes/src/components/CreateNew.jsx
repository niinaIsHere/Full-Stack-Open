import { useNavigate } from 'react-router-dom'
import { useField, useAnecdotes } from '../hooks'

const CreateNew = () => {
  const navigate = useNavigate()
  const { addAnecdote } = useAnecdotes()

  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    addAnecdote({ content: content.properties.value, author: author.properties.value, info: info.properties.value, votes: 0 })
    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.properties} />
        </div>
        <div>
          author
          <input {...author.properties} />
        </div>
        <div>
          url for more info
          <input {...info.properties} />
        </div>
        <button>create</button>
        <button type='button' onClick={() => {content.functions.reset(), author.functions.reset(), info.functions.reset()}}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew

