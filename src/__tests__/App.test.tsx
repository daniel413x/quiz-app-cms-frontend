import { render, screen } from "@testing-library/react";
import App from "@/App";
import "@testing-library/jest-dom";

test("renders a layout", () => {
  render(<App />);
  const layout = screen.getByTestId("main-layout");
  expect(layout).toBeDefined();
});

test("renders a login button", () => {
  render(<App />);
  const loginButton = screen.getByTestId("login-button");
  expect(loginButton).toBeDefined();
});
