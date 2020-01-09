import React, { useState } from "react";
import { EDIT_BIRTHYEAR, ALL_AUTHORS } from "../quaries";
import { useMutation } from "@apollo/react-hooks";
import Select from "react-select";

const Birthyear = ({ authors }) => {
  const [option, setOption] = useState(null);
  const [born, setBorn] = useState("");

  const options = [];
  authors.allAuthors.forEach(author => {
    options.push({
      value: author.name,
      label: author.name
    });
  });

  const [editBirthyear] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  });

  const handleChange = option => {
    setOption(option);
  };

  const submit = async e => {
    e.preventDefault();

    await editBirthyear({
      variables: { name: option.value, setBornTo: parseInt(born) }
    });
    setOption("");
    setBorn("");
  };

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <Select value={option} options={options} onChange={handleChange} />
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
