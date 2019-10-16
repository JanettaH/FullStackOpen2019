import React, { useState } from "react";
import { EDIT_BIRTHYEAR, ALL_AUTHORS } from "../quaries";
import { useMutation } from "@apollo/react-hooks";

const Birthyear = () => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [editBirthyear] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  });

  const submit = async e => {
    e.preventDefault();
    await editBirthyear({
      variables: { name, setBornTo: parseInt(born) }
    });
    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        name
        <input value={name} onChange={({ target }) => setName(target.value)} />
        <br />
        born
        <input value={born} onChange={({ target }) => setBorn(target.value)} />
        <br />
        <button type="submit">update author</button>
      </form>
    </div>
  );
};
export default Birthyear;
