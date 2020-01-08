import React from "react";
import blogService from "../services/blogs";
import userService from "../services/user";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const Blog = ({ blog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <div className="blogDiv" style={blogStyle}>
      <div className="toggis">
        <Table striped>
          <tbody>
            <Link to={"/blogs/" + blog.id}>
              {blog.title} {blog.author}{" "}
            </Link>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Blog;
