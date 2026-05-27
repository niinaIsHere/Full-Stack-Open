import Togglable from "./Togglable"

const Blog = ({ blog, handleLike, handleRemove }) => (
  <div>
    {blog.title} {blog.author}
    <Togglable buttonLabel="view">
      <p>{blog.url}</p>
      <p>likes {blog.likes}<button onClick={() => handleLike(blog)}>like</button></p>
      <p>{blog.user.username}</p>
      <button onClick={() => handleRemove(blog)}>Remove</button>
    </Togglable>
  </div>
)

export default Blog
