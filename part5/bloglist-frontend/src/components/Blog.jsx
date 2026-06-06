import Togglable from './Togglable'
import { useParams } from 'react-router-dom'

const Blog = ({ blog, handleLike, handleRemove, loggedInUser }) => {

  if(!blog) {
    return null
  }

  var isCreator = false
  if (loggedInUser !== null) {
    isCreator = loggedInUser.id === blog.user.id
  }
  return (
    <div className="blog">
      <h2>{blog.author}: {blog.title}</h2>
      <p>{blog.url}</p>
      <p>Added by {blog.user.username}</p>
      <p>likes {blog.likes}</p>
      {loggedInUser && <button style={{ color: 'green' }} onClick={() => handleLike(blog)}>like</button>}
      {isCreator &&
        <button style={{ color: 'red' }} onClick={() => handleRemove(blog)}>Remove</button>
      }
    </div>
  )}

export default Blog
