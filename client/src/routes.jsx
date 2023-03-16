import React from "react";
import { createBrowserRouter } from "react-router-dom";

import UserName from "./components/username";
import Register from "./components/register";
import Password from "./components/password";
import Profile from "./components/profile";
import Recover from "./components/recover";
import Reset from "./components/reset";
import PageNotFound from "./components/pagenotfound";

// root routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <UserName />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/password",
    element: <Password />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/recover",
    element: <Recover />,
  },
  {
    path: "/reset",
    element: <Reset />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;
