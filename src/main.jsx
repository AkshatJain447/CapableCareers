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
import Employer from "./routes/Employer.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import PersonalInfo from "./components/dashboard/PersonalInfo.jsx";
import JobPosted from "./components/dashboard/JobPosted.jsx";
import PostNew from "./components/dashboard/PostNew.jsx";
import JobSeeker from "./routes/JobSeeker.jsx";
import DashBoard from "./components/SeekerDashBoard/DashBoard.jsx";
import SeekerPersonalInfo from "./components/SeekerDashBoard/PersonalInfo.jsx";

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
        path: "/jobSeeker/dashboard",
        element: <JobSeeker />,
        children: [
          {
            path: "",
            element: <DashBoard />,
          },
          {
            path: "personalInfo",
            element: <SeekerPersonalInfo />,
          },
        ],
      },
      {
        path: "/employerdash/dashboard",
        element: <Employer />,
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "personalInfo",
            element: <PersonalInfo />,
          },
          {
            path: "jobPosted",
            element: <JobPosted />,
          },
          {
            path: "postNew",
            element: <PostNew />,
          },
        ],
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
