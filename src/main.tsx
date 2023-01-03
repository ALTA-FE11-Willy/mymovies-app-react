import React from "react";
import ReactDOM from "react-dom/client";
import Detail from "./pages/Detail";
import Homepage from "./pages/Homepage";
import ListFavorite from "./pages/ListFavorite";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Detail />
  </React.StrictMode>
);
