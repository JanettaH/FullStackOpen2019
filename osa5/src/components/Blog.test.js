import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";
import "@testing-library/jest-dom/extend-expect";

describe("<Togglable />", () => {
  let component;

  const blog = {
    author: "blog.author",
    title: "blog.title",
    url: "blog.url",
    user: {
      name: "JttA",
      id: 2
    },
    likes: 3
  };

  const user = {
    id: 2
  };

  beforeEach(() => {
    component = render(<Blog blog={blog} user={user}></Blog>);
  });
  test("renders content", () => {
    expect(component.container).toHaveTextContent("blog.title");
    expect(component.container).toHaveTextContent("blog.author");
  });

  test("clicking the button calls event handler once", () => {
    const div = component.container.querySelector(".toggis");
    fireEvent.click(div);

    expect(component.container).toHaveTextContent("blog.url");
    expect(component.container).toHaveTextContent("JttA");
    expect(component.container).toHaveTextContent("3");
  });
});
