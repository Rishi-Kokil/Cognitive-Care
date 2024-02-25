import { useState } from 'react'
import * as React from "react";
import { createBrowserRouter, RouterProvider, } from "react-router-dom";

import ContextWrapper from './context/ContextWrapper';
import { Home, Login, Signup, UserDashBoard } from './pages';
import {UserHome, UserProfile, UserForum, UserSettings, CreateUserPatient, ManageUserPatient, PatientInfo} from './components/User'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/user",
    element: <UserDashBoard />,
    children: [
      {
        path: "home",    // Home route under user
        element: <UserHome />
      },
      {
        path: "create-patient",    // Home route under user
        element: <CreateUserPatient />
      },
      {
        path: "manage-patient",    // Home route under user
        element: <ManageUserPatient />
      },
      {
        path : "patient-info/:id",
        element : <PatientInfo />

      },
      {
        path: "profile", // Profile route under user
        element: <UserProfile />
      },
      {
        path: "settings", // Settings route under user
        element: <UserSettings />
      },
      {
        path: "forum",     // Chat route under user
        element: <UserForum />
      } 
    ]
  }
]);


function App() {
  return (
    <>
      <ContextWrapper>
        <RouterProvider router={router} />
      </ContextWrapper>
    </>
  )
}

export default App;
