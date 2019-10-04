import React from "react";
import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, deleteBlo, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  const [showDetails, setShowDetails] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const like = async () => {
    const updateBlog = {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: likes + 1,
      id: blog.id
    };
    await blogService.updateBlog(updateBlog);
    setLikes(likes + 1);
  };

  const deleteBlog = async () => {
    let confirmed = window.confirm("remove blog " + blog.title + "?");
    if (confirmed === true) {
      await blogService.deleteBlog(blog.id);
      deleteBlo();
    }
  };
  return (
    <div style={blogStyle}>
      <div className="toggis" onClick={() => toggleDetails()}>
        {blog.title} {blog.author}{" "}
      </div>
      {showDetails ? (
        <div>
          <p>{blog.url}</p>
          <p>
            {likes} likes <button onClick={like}>like</button>
          </p>
          <p>added by {blog.user.name}</p>
          {blog.user.id === user.id ? (
            <button onClick={deleteBlog}>remove</button>
          ) : (
            <p>You are not the owner of this blog</p>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Blog;
