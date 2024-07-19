import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import ContextWrapper from "./context/ContextWrapper";
import { Home, Login, Signup, UserDashBoard } from "./pages";
import {
  UserHome,
  UserProfile,
  UserForum,
  UserSettings,
  CreateUserPatient,
  ManageUserPatient,
  PatientInfo,
  MMSE,
  MMSEPatientList,
  MMSETestComponent
} from "./components/User";

import PageNotFound from "./pages/PageNotFound";
import EbbAndFlowPage from "./pages/games/EbbAndFlowPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/user",
    element: <UserDashBoard />,
    children: [
      {
        path: "home", // Home route under user
        element: <UserHome />,
      },
      {
        path: "create-patient", // Home route under user
        element: <CreateUserPatient />,
      },
      {
        path: "manage-patient", // Home route under user
        element: <ManageUserPatient />,
      },
      {
        path: "patient-info/:id",
        element: <PatientInfo />,
      },
      {
        path: "profile", // Profile route under user
        element: <UserProfile />,
      },
      {
        path: "settings", // Settings route under user
        element: <UserSettings />,
      },
      {
        path: "mmse", // Settings route under user
        element: <MMSE />,
        children: [
          {
            path: "patient-list",
            element: <MMSEPatientList />,
          },
          {
            path: "test/:pid",
            element: <MMSETestComponent />,
          },
        ],
      },
      {
        path: "game", // Profile route under user
        element: <EbbAndFlowPage />,
      },
      {
        path: "forum", // Chat route under user
        element: <UserForum />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  return (
    <>
      <RecoilRoot>
        <ContextWrapper>
          <RouterProvider router={router} />
        </ContextWrapper>
      </RecoilRoot>
    </>
  );
}

export default App;
