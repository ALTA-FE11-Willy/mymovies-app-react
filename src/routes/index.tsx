import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Component, useState, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux/es/exports";
import Homepage from "pages/Homepage";
import DetailMovie from "pages/DetailMovie";
import ListFavorite from "pages/ListFavorite";

import { ThemeContext } from "utils/context";
import { setFavorites } from "utils/redux/reducers/reducer";
import Todo from "pages/Todo";

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
  {
    path: "/todo",
    element: <Todo />,
  },
]);

const App = () => {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState("dark");
  const background = useMemo(() => ({ theme, setTheme }), [theme]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const getFavMovies = localStorage.getItem("FavMovie");
    if (getFavMovies) {
      dispatch(setFavorites(JSON.parse(getFavMovies)));
    }
  }, []);

  return (
    <ThemeContext.Provider value={background}>
      <RouterProvider router={router} />
    </ThemeContext.Provider>
  );
};

export default App;
