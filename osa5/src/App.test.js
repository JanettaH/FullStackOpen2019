import React from "react";
import { render, waitForElement } from "@testing-library/react";
jest.mock("./services/blogs");
import App from "./App";

describe("<App />", () => {
  test("if no user logged, notes are not rendered", async () => {
    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() => component.getByText("Login to application"));

    expect(component.container).toHaveTextContent("username");
    expect(component.container).toHaveTextContent("password");
  });

  test("renders all blogs it gets from backend", async () => {
    const user = {
      username: "tester",
      token: "1231231214",
      name: "Donald Tester"
    };

    localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
    const component = render(<App />);
    component.rerender(<App />);
    await waitForElement(() => component.container.querySelector(".blogsform"));
    const blogs = component.container.querySelectorAll(".blogDiv");
    expect(blogs.length).toBe(3);

    expect(component.container).toHaveTextContent("Otsikko");
    expect(component.container).toHaveTextContent("Toinen blogi");
    expect(component.container).toHaveTextContent("Kolmas blogi");
  });
});
