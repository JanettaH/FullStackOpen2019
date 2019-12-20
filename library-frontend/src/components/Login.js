import React from "react";
import { useField } from "../hooks/index";
import { useMutation } from "@apollo/react-hooks";
import { LOG_IN } from "../quaries";

const Login = props => {
  const [username, resetUsername] = useField("username");
  const [password, resetPassword] = useField("password");

  const [login] = useMutation(LOG_IN, {
    onCompleted({ login }) {
      window.localStorage.setItem("loggedLibraryAppUser", login.value);
      console.log(login.value);
      props.appCallback(login.value);
    }
  });

  const handleLogin = async event => {
    event.preventDefault();
    await login({
      variables: { username: username.value, password: password.value }
    });
    resetUsername();
    resetPassword();
    props.setBooksPage("books");
  };

  if (!props.show) {
    return null;
  }
  return (
    <div>
      <h2>Kirjaudu sisään</h2>

      <form onSubmit={handleLogin}>
        <div>
          Käyttäjätunnus
          <input {...username} />
        </div>
        <div>
          Salasana
          <input {...password} />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
  );
};

export default Login;
