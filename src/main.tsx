import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { appConfig } from "./config/app";

document.documentElement.style.setProperty("--color-primary", appConfig.primaryColor);
document.documentElement.style.setProperty("--color-accent", appConfig.accentColor);
document.documentElement.style.setProperty("--color-bg", appConfig.backgroundColor);
document.documentElement.style.setProperty("--font-sans", appConfig.fontFamily);
document.title = appConfig.name;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
