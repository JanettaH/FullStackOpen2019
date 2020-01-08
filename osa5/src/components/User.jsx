import React from "react";

const User = ({ users, id }) => {
  console.log(users);
  if (users === undefined || users === null || users.length === 0) {
    return null;
  }

  const userById = users.find(u => u.id === id);
  return (
    <div>
      <h2> {userById.username}</h2>
      <h3>Added blogs:</h3>

      <ul>
        {userById.blogs.length === 0 ? (
          <p>Sorry, no blogs :(</p>
        ) : (
          userById.blogs.map(blog => <li key={blog.id}> {blog.title}</li>)
        )}
      </ul>
    </div>
  );
};

export default User;
