
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'

const BlogForm = ({ creator, createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const navigate = useNavigate()

  console.log(window.localStorage.getItem('loggedBlogappUser'))

  const addBlog = event => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
      user: creator
    })

    navigate('/')

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        <label>
          <TextField
            label='title'
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label><br/>
        <label>
          <TextField
            label='author'
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label><br/>
        <label>
          <TextField
            label='url'
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}

          />
        </label><br/>
        <Button type="submit" variant="contained" style={{ marginTop: 10 }}>create</Button>
      </form>
    </div>
  )
}

export default BlogForm