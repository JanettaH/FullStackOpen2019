import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { ALL_BOOKS } from "../quaries";

const Books = props => {
  const [genres, setGenres] = useState(null);
  const [books, setBooks] = useState(null);
  const [selected, setSelected] = useState("");
  const { data, loading } = useQuery(ALL_BOOKS, {
    onCompleted: data => {
      console.log(data);
      setBooks(data.allBooks);
      console.log(data.allBooks);
      let genreList = [];
      data.allBooks.map(book => {
        book.genres.map(genre => {
          if (!genreList.includes(genre)) {
            genreList.push(genre);
          }
        });
      });
      setGenres(genreList);
    }
  });

  const filter = genre => {
    setSelected(genre);
  };

  if (!props.show) {
    return null;
  } else if (loading) {
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

          {selected !== ""
            ? books
                .filter(a => a.genres.includes(selected))
                .map(a => (
                  <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                  </tr>
                ))
            : books.map(a => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
        </tbody>
      </table>
      {genres.map(g => (
        <button onClick={() => filter(g)} key={g}>
          {g}
        </button>
      ))}

      <button onClick={() => filter("")}>all genres</button>
    </div>
  );
};

export default Books;
