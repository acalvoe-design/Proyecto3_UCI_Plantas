import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AmbienteProceso } from "./screens/AmbienteProceso";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <AmbienteProceso />
  </StrictMode>,
);
