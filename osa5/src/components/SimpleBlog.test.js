import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SimpleBlog from "./SimpleBlog";
import "@testing-library/jest-dom/extend-expect";

describe("<Togglable />", () => {
  let component;

  let blog = {
    title: "Heippa",
    author: "Meitsi",
    likes: 4
  };

  const mockHandler = jest.fn();

  beforeEach(() => {
    component = render(
      <SimpleBlog blog={blog} onClick={mockHandler}></SimpleBlog>
    );
  });
  test("renders content", () => {
    expect(component.container).toHaveTextContent("Heippa");
    expect(component.container).toHaveTextContent("Meitsi");
    expect(component.container).toHaveTextContent(4);
  });

  test("clicking the button calls event handler once", () => {
    const button = component.container.querySelector(".button");
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockHandler.mock.calls.length).toBe(2);
  });
});
