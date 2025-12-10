import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

//import App from "./App";
import MathFlashcards from "./math-flashcards";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <MathFlashcards />
  </StrictMode>
);
