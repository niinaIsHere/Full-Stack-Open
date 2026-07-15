import Togglable from "./Togglable";
import NotFound from "./NotFound";
import CommentForm from "./CommentForm";

const Blog = ({
  blog,
  handleLike,
  handleRemove,
  handleComment,
  loggedInUser,
}) => {
  if (!blog) {
    return <NotFound />;
  }

  console.log(blog.comments);
  console.log(blog.id);

  var isCreator = false;

  const creatorId = typeof blog.user === "string" ? blog.user : blog.user.id;
  const username =
    typeof blog.user === "string" ? loggedInUser.username : blog.user.username;

  if (loggedInUser !== null) {
    isCreator = loggedInUser.id === creatorId;
  }
  return (
    <div className="blog">
      <h2>
        {blog.author}: {blog.title}
      </h2>
      <p>{blog.url}</p>
      <p>Added by {username}</p>
      <p>likes {blog.likes}</p>
      {loggedInUser && (
        <button style={{ color: "green" }} onClick={() => handleLike(blog)}>
          like
        </button>
      )}
      {isCreator && (
        <button style={{ color: "red" }} onClick={() => handleRemove(blog)}>
          Remove
        </button>
      )}
      <h2>Comments</h2>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment._id}>{comment.content}</li>
        ))}
      </ul>
      <CommentForm blog_id={blog.id} />
    </div>
  );
};

export default Blog;
