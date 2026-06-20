import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConfiguracinProceso } from "./screens/ConfiguracinProceso";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <ConfiguracinProceso />
  </StrictMode>,
);
