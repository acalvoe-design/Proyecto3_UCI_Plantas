import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { EstadoProceso } from "./screens/EstadoProceso";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <EstadoProceso />
  </StrictMode>,
);
