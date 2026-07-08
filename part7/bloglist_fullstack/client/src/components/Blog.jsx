import Togglable from './Togglable'

const Blog = ({ blog, handleLike, handleRemove, loggedInUser }) => {

  if(!blog) {
    return null
  }

  var isCreator = false

  const creatorId = typeof blog.user === 'string' ? blog.user : blog.user.id
  const username = typeof blog.user === 'string' ? loggedInUser.username : blog.user.username


  if (loggedInUser !== null) {
    isCreator = loggedInUser.id === creatorId
  }
  return (
    <div className="blog">
      <h2>{blog.author}: {blog.title}</h2>
      <p>{blog.url}</p>
      <p>Added by {username}</p>
      <p>likes {blog.likes}</p>
      {loggedInUser && <button style={{ color: 'green' }} onClick={() => handleLike(blog)}>like</button>}
      {isCreator &&
        <button style={{ color: 'red' }} onClick={() => handleRemove(blog)}>Remove</button>
      }
    </div>
  )}

export default Blog
