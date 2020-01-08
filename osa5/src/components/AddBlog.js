import React from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";
import { useField } from "../hooks";

const AddBlog = ({ reload }) => {
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");

  const handleCreate = async event => {
    event.preventDefault();

    let newBlog = {
      title: title.value,
      author: author.value,
      url: url.value
    };

    await blogService.addBlog(newBlog);
    reload(newBlog);
    title.reset();
    author.reset();
    url.reset();
  };
  return (
    <div>
      <h2>Create new blog</h2>

      <form onSubmit={handleCreate}>
        <div>
          <p>Title</p>
          <input id="title" {...title.inputFields()} />
        </div>
        <br></br>
        <div>
          <p>Author</p>
          <input id="author" {...author.inputFields()} />
        </div>
        <br></br>
        <div>
          <p>Url</p>
          <input id="url" {...url.inputFields()} />
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
