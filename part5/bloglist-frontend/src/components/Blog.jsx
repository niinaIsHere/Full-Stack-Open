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
      <p>likes {blog.likes}
        {loggedInUser && <button onClick={() => handleLike(blog)}>like</button>}
      </p>
      <p>Added by {blog.user.username}</p>
      {isCreator &&
        <button onClick={() => handleRemove(blog)}>Remove</button>
      }
    </div>
  )}

export default Blog
