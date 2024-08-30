import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./scss/base/index.scss";
import "./index.css";
import ModalProvider from "./contexts/ModelPopUp/ModelProvider.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ModalProvider>
            <App />
        </ModalProvider>
    </StrictMode>
);
