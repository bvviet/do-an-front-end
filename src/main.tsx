import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./scss/base/index.scss";
import "./index.css";
import ModalProvider from "./contexts/ModelPopUp/ModelProvider.tsx";
import { OverlayProvider } from "./contexts/Overlay.tsx";
import { ThemeProvider } from "@mui/material";
import theme from "./configs/muiConfigs.ts";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <StrictMode>
      <ModalProvider>
        <OverlayProvider>
          <App />
        </OverlayProvider>
      </ModalProvider>
    </StrictMode>
  </ThemeProvider>,
);
