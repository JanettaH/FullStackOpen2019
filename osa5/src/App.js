import React from "react";
import { useState, useEffect } from "react";
import loginService from "./services/login";
import blogService from "./services/blogs";
import Blog from "./components/Blog";
import AddBlog from "./components/AddBlog";
import ErrorNotification from "./components/errorNotification";
import Notification from "./components/notification";
import Togglable from "./components/togglable";

const App = React.forwardRef((props, ref) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const blogAdded = newBlog => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs);
      setMessage(
        "a new blog " + newBlog.title + " by " + newBlog.author + " added"
      );
      setTimeout(() => {
        setMessage(null);
      }, 6000);
    });
  };

  const deleteBlog = () => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs);
      setMessage("Blog deleted");
      setTimeout(() => {
        setMessage(null);
      }, 6000);
    });
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      setErrorMessage("Invalid credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 6000);
    }
  };

  const loginForm = () => (
    <div>
      <h2>Login to application</h2>
      <ErrorNotification message={errorMessage} />

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );

  const blogsForm = () => (
    <div>
      <Notification message={message}></Notification>
      <h2>Blogs</h2>
      <p>{user.username} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel="new blog">
        <AddBlog reload={blogAdded} />
      </Togglable>
      <div>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog => (
            <Blog
              deleteBlo={deleteBlog}
              key={blog.id}
              blog={blog}
              user={user}
            />
          ))}
      </div>
    </div>
  );

  return <div>{user === null ? loginForm() : blogsForm()}</div>;
});

export default App;
