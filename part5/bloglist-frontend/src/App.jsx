import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import axios from 'axios'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      const users = await axios.get('/api/users')
      const fullUser = users.data.find(u => u.username === user.username)

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(fullUser)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    blogService.setToken(null)
    setUser(null)
  }

  const addBlog = blogObject => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
    })
  }

  const handleLike = async (blog) => {
    const updateId = blog.id

    const newLikes = blog.likes + 1
    const updatedBlog = {
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      likes: newLikes,
      url: blog.url
    }

    const returnedBlog = await blogService.update(updateId, updatedBlog)

    const updatedBlogs = blogs.map(b => b.id !== updateId ? b : returnedBlog)

    setBlogs(updatedBlogs)

    return returnedBlog
  }

  const handleRemove = async (blog) => {
    const removeId = blog.id

    await blogService.remove(removeId)
    const updatedBlogs = blogs.filter(b => b.id !== removeId)

    setBlogs(updatedBlogs)
  }

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  )

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage}/>

      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
      )}

      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove} loggedInUser={user} />)}
    </div>
  )
}

export default App
