// Import React
import React from "react";

// Import ReactDOM
import ReactDOM from "react-dom/client";

// Import Browser Router
import { BrowserRouter } from "react-router-dom";

// Import App Component
import App from "./App";

// Import Global CSS
import "./styles/global.css";

// Render React Application
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);