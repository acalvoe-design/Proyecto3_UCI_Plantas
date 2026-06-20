import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PlantaEstadoVaco } from "./screens/PlantaEstadoVaco";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <PlantaEstadoVaco />
  </StrictMode>,
);
