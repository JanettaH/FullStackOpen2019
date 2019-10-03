import React from "react";
import { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const AddBlog = ({ reload }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreate = async event => {
    event.preventDefault();

    let newBlog = {
      title: title,
      author: author,
      url: url
    };

    await blogService.addBlog(newBlog);
    reload(newBlog);
  };
  return (
    <div>
      <h2>Create new blog</h2>

      <form onSubmit={handleCreate}>
        <div>
          <input
            type="text"
            value={title}
            name="Title"
            placeholder="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <br></br>
        <div>
          <input
            type="text"
            value={author}
            name="Author"
            placeholder="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <br></br>
        <div>
          <input
            type="text"
            value={url}
            name="Url"
            placeholder="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <br></br>
        <button type="submit">create</button>
        <br></br>
        <br></br>
      </form>
    </div>
  );
};

AddBlog.propTypes = {
  reload: PropTypes.func.isRequired
};
export default AddBlog;
