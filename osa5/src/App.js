import React from "react";
import { useState, useEffect } from "react";
import loginService from "./services/login";
import blogService from "./services/blogs";
import Blog from "./components/Blog";
import AddBlog from "./components/AddBlog";
import ErrorNotification from "./components/errorNotification";
import Notification from "./components/notification";
import Togglable from "./components/togglable";
import { useField } from "./hooks";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Users from "./components/Users";
import User from "./components/User";
import userService from "./services/user";
import SingleBlog from "./components/SingleBlog";
import { Table, Form, Button } from "react-bootstrap";
import { Navbar, Nav } from "react-bootstrap";

const App = () => {
  const username = useField("text");
  const password = useField("password");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs);
    });
  }, []);

  useEffect(() => {
    const initialUsers = userService.getAll().then(newUsers => {
      setUsers(newUsers);
      console.log(newUsers);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
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
    blogService.setToken(null);
  };

  const Menu = () => {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link to="/">Blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link to="/users">Users</Link>
            </Nav.Link>
          </Nav>
          <button
            onClick={handleLogout}
            type="button"
            class="btn btn-outline-primary"
          >
            logout
          </button>
        </Navbar.Collapse>
      </Navbar>
    );
  };

  const handleLogin = async event => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      username.reset();
      password.reset();
      setMessage("Welcome " + user.username);
      setTimeout(() => {
        setMessage(null);
      }, 6000);
    } catch (error) {
      setErrorMessage("Invalid credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 6000);
      username.reset();
      password.reset();
    }
  };

  const loginForm = () => (
    <div className="loginForm">
      <h2>Login to application</h2>
      <ErrorNotification message={errorMessage} />

      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username: </Form.Label>
          <Form.Control id="username" {...username.inputFields()} />
          <Form.Label>Password: </Form.Label>
          <Form.Control id="password" {...password.inputFields()} />
          <br />
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  );

  const blogsForm = () => (
    <div className="blogsform">
      <Router>
        <Notification message={message}></Notification>
        <Menu />

        <p>{user.username} logged in</p>

        <Togglable buttonLabel="new blog">
          <AddBlog reload={blogAdded} />
        </Togglable>
        <Route exact path="/users" render={() => <Users users={users} />} />
        <h2>Blogs</h2>
        <Route
          exact
          path="/"
          render={() =>
            blogs
              .sort((a, b) => b.likes - a.likes)
              .map(blog => (
                <Blog
                  className="blogDiv"
                  key={blog.id}
                  blog={blog}
                  user={user}
                />
              ))
          }
        />

        <Route
          exact
          path="/users/:id"
          render={({ match }) => <User users={users} id={match.params.id} />}
        />
        <Route
          exact
          path="/blogs/:id"
          render={({ match }) => (
            <SingleBlog
              deleteBlog={deleteBlog}
              blogs={blogs}
              id={match.params.id}
              user={user}
            />
          )}
        />
      </Router>
    </div>
  );

  return (
    <div class="container">{user === null ? loginForm() : blogsForm()}</div>
  );
};

export default App;
