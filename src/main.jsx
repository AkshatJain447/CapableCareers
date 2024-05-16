import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App.jsx";
import "./index.css";
import { store } from "./store/index.js";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Jobs from "./components/Jobs/Jobs.jsx";
import Training from "./components/Trainings/Training.jsx";
import Events from "./components/Events/Events.jsx";
import Employer from "./components/Employer/Employer.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/jobs",
        element: <Jobs />,
      },
      {
        path: "/training",
        element: <Training />,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/employerdash",
        element: <Employer />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
