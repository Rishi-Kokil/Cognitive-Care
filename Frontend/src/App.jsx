import { useState } from 'react'
import * as React from "react";
import { createBrowserRouter, RouterProvider, } from "react-router-dom";

import ContextWrapper from './context/ContextWrapper';
import {Home , Login , Signup} from './pages';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path : "/signup",
    element : <Signup />
  },
  {
    path : "/login",
    element : <Login />
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
