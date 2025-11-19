import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders gallery heading", async () => {
  render(<App />);
  expect(await screen.findByText(/Picsum Gallery/i)).toBeInTheDocument();
});
