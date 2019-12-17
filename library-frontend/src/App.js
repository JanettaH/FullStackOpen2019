import React, { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";

const App = () => {
  const [page, setPage] = useState("authors");

  const [token, setToken] = useState("");

  const handleLogout = () => {
    window.localStorage.removeItem("loggedLibraryAppUser");
    setToken("");
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedLibraryAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setToken(user);
    }
  }, []);

  const callbackFunction = data => {
    setToken(data);
  };

  const setBooksPage = pageName => {
    setPage(pageName);
    console.log(page);
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token === "" || token === null ? (
          <button type="button" disabled>
            add book
          </button>
        ) : (
          <button onClick={() => setPage("add")}>add book</button>
        )}

        {token === "" || token === null ? (
          <button onClick={() => setPage("login")}>login</button>
        ) : (
          <button onClick={handleLogout}>logout</button>
        )}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />
      <Login
        appCallback={callbackFunction}
        show={page === "login"}
        setBooksPage={setBooksPage}
      />
      <p>{token}</p>
    </div>
  );
};

export default App;
