import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { ALL_AUTHORS } from "../quaries";
import Birthyear from "./Birthyear";

const Authors = props => {
  const { data, loading, error } = useQuery(ALL_AUTHORS);

  console.log(data);
  const authors = data;
  console.log(authors);
  console.log(error);

  if (!props.show) {
    return null;
  } else if (loading) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <Birthyear authors={authors} />
      </div>
    </div>
  );
};

export default Authors;
