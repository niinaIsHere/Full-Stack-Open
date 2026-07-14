import NotFound from "./NotFound";

const User = ({ user }) => {
  if (!user) {
    return <NotFound />;
  }

  return (
    <div className="user">
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {user.blogs.map((blog) => (
          <li>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
