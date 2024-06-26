import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ArweaveWalletKit } from "arweave-wallet-kit";
import { ThemeProvider } from "./context/ThemeContext";
import ReactGA from "react-ga4";

ReactGA.initialize(import.meta.env.VITE_GA_TAG);
ReactGA.send({
  hitType: "pageview",
  page: window.location.pathname,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <ArweaveWalletKit
        config={{
          permissions: [
            "SIGN_TRANSACTION",
            "ACCESS_ADDRESS",
            "ACCESS_PUBLIC_KEY",
          ],
          ensurePermissions: true,
        }}
        theme={{
          accent: { r: 255, g: 145, b: 48 },
          displayTheme: "dark",
        }}
      >
        <App />
      </ArweaveWalletKit>{" "}
    </ThemeProvider>
  </React.StrictMode>
);
