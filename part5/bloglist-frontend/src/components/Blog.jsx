import Togglable from './Togglable'

const Blog = ({ blog, handleLike, handleRemove, loggedInUser }) => {
  var isCreator = false
  if (loggedInUser !== null) {
    isCreator = loggedInUser.id === blog.user.id
  }
  return (
    <div className="blog">
      {blog.title} {blog.author}
      <Togglable buttonLabel="view">
        <p>{blog.url}</p>
        <p>likes {blog.likes}<button onClick={() => handleLike(blog)}>like</button></p>
        <p>{blog.user.username}</p>
        {isCreator &&
          <button onClick={() => handleRemove(blog)}>Remove</button>
        }
      </Togglable>
    </div>
  )}

export default Blog
