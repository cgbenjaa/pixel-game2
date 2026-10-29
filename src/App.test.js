import { render, screen } from "@testing-library/react";
import App from "./App";

test("muestra el pie de página de Pixel Game", () => {
  render(<App />);
  expect(screen.getByText("Tu próxima aventura comienza aquí.")).toBeTruthy();
});
