import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useMatch,
  useNavigate,
} from "react-router-dom";
import BlogList from "./components/BlogList";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import ErrorBoundary from "./ErrorBoundary";
import axios from "axios";
import { AppBar, Button, Container, Toolbar } from "@mui/material";
import NotFound from "./components/NotFound";
import { useBlogActions } from "./store";
import useBlogStore from "./store";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const actions = useBlogActions();
  const initialize = useBlogStore((state) => state.actions.initialize);

  useEffect(() => {
    blogService.getAll().then((blogs) => initialize(blogs));
  }, [initialize]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const loginResponse = await loginService.login({ username, password });
      const users = await axios.get("/api/users");
      const user = users.data.find(
        (u) => u.username === loginResponse.username,
      );
      const fullUser = {
        ...user,
        token: loginResponse.token,
      };

      window.localStorage.setItem(
        "loggedBlogappUser",
        JSON.stringify(fullUser),
      );
      blogService.setToken(loginResponse.token);
      setUser(user);
      setUsername("");
      setPassword("");
      navigate("/blogs");
    } catch {
      actions.setNotification({ text: "wrong credentials", type: "error" });
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    blogService.setToken(null);
    setUser(null);
  };

  const addBlog = (blogObject) => {
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));

      actions.setNotification({ type: "success", text: "new blog added" });
    });
  };

  const handleLike = async (blog) => {
    const updateId = blog.id;

    const newLikes = blog.likes + 1;
    const updatedBlog = {
      ...blog,
      user: blog.user.id,
      likes: newLikes,
    };

    const returnedBlog = await blogService.update(updateId, updatedBlog);
    console.log(returnedBlog);

    const updatedBlogs = blogs.map((b) =>
      b.id !== updateId ? b : returnedBlog,
    );

    setBlogs(updatedBlogs);

    return returnedBlog;
  };

  const handleRemove = async (blog) => {
    const removeId = blog.id;

    await blogService.remove(removeId);
    const updatedBlogs = blogs.filter((b) => b.id !== removeId);

    setBlogs(updatedBlogs);
    navigate("/blogs");
  };

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  );

  const padding = {
    padding: 5,
  };

  const match = useMatch("/blogs/:id");
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

  const style = { "&:hover": { bgcolor: "rgba(255,255,255,0.3)" } };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/blogs" sx={style}>
            blogs
          </Button>
          {user && (
            <Button color="inherit" component={Link} to="/create" sx={style}>
              new blog
            </Button>
          )}
          {!user && (
            <Button color="inherit" component={Link} to="/login" sx={style}>
              login
            </Button>
          )}
          {user && <button onClick={handleLogout}>logout</button>}
        </Toolbar>
      </AppBar>

      <Notification />
      <Routes>
        <Route
          path="/blogs/:id"
          element={
            <ErrorBoundary>
              <Blog
                blog={blog}
                handleLike={handleLike}
                handleRemove={handleRemove}
                loggedInUser={user}
              />
            </ErrorBoundary>
          }
        />
        <Route
          path="/blogs"
          element={
            <ErrorBoundary>
              <BlogList />
            </ErrorBoundary>
          }
        />
        <Route
          path="/login"
          element={
            <ErrorBoundary>
              <LoginForm
                username={username}
                password={password}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
                handleSubmit={handleLogin}
              />
            </ErrorBoundary>
          }
        />
        <Route
          path="/create"
          element={user && <BlogForm creator={user.id} createBlog={addBlog} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Container>
  );
};

export default App;
