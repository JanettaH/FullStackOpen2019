import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { ME } from "../quaries";
import { ALL_BOOKS } from "../quaries";

const Recommend = props => {
  const { data, loading } = useQuery(ME);
  const { data: booksData, loading: booksLoading } = useQuery(ALL_BOOKS);
  console.log(booksData);

  if (!props.show) {
    return null;
  } else if (loading || booksLoading) {
    return <p>loading</p>;
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>

          {booksData.allBooks
            .filter(a => a.genres.includes(data.me.favoriteGenre))
            .map(a => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
