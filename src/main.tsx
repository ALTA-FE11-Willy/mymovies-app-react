import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes";
import "./styles/index.css";

axios.defaults.baseURL = "https://api.themoviedb.org/3/movie/";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
