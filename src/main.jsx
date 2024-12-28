// main.jsx or index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Ensure the path is correct
import "./index.css"; // Add styles if required

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
