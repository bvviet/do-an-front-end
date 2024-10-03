import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./scss/base/index.scss";
import "./index.css";
import ModalProvider from "./contexts/ModelPopUp/ModelProvider.tsx";
import { OverlayProvider } from "@/contexts/Overlay.tsx";
import { ThemeProvider } from "@mui/material";
import theme from "./configs/muiConfigs.ts";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { persistor, store } from "@/redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <StrictMode>
          <ModalProvider>
            <OverlayProvider>
              <App />
              <ToastContainer />
            </OverlayProvider>
          </ModalProvider>
        </StrictMode>
      </ThemeProvider>
    </PersistGate>
  </Provider>,
);
