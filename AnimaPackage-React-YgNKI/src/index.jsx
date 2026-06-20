import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Alertas } from "./screens/Alertas";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <Alertas />
  </StrictMode>,
);
