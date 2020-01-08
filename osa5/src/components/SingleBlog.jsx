import React, { useState, useEffect } from "react";
import blogService from "../services/blogs";

const SingleBlog = ({ blogs, id, deleteBlog, user }) => {
  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(null);

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      console.log(initialBlogs);
      let blog = initialBlogs.find(b => b.id === id);
      setBlog(blog);
      console.log(blog);
      setLikes(blog.likes);
    });
  }, []);

  /* if (blog !== null && blog !== undefined) {
    setLikes(blog.likes);
  } */
  const like = async () => {
    const updateBlog = {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: likes + 1,
      id: blog.id
    };
    setLikes(likes + 1);

    blogService.updateBlog(updateBlog);
  };

  const handleDelete = async () => {
    let confirmed = window.confirm("remove blog " + blog.title + "?");
    if (confirmed === true) {
      await blogService.deleteBlog(blog.id);
      deleteBlog();
    }
  };

  if (blog === null || blog === undefined) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {likes} likes <button onClick={like}>like</button>
      </p>
      <p>added by {blog.user.name}</p>
      {blog.user.id === user.id ? (
        <button onClick={handleDelete}>remove</button>
      ) : (
        <p>You are not the owner of this blog, so you can't delete</p>
      )}
    </div>
  );
};

export default SingleBlog;
