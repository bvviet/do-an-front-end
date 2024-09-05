import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./scss/base/index.scss";
import "./index.css";
import ModalProvider from "./contexts/ModelPopUp/ModelProvider.tsx";
import { OverlayProvider } from "./contexts/Overlay.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ModalProvider>
            <OverlayProvider>
                <App />
            </OverlayProvider>
        </ModalProvider>
    </StrictMode>
);
