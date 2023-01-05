import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Component } from "react";
import Homepage from "../pages/Homepage";
import DetailMovie from "../pages/DetailMovie";
import ListFavorite from "../pages/ListFavorite";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/movie/:id_movie", // Path param
    element: <DetailMovie />,
  },
  {
    path: "/favorites",
    element: <ListFavorite />,
  },
]);

class App extends Component {
  render() {
    return <RouterProvider router={router} />;
  }
}

export default App;
