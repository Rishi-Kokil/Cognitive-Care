import { useState } from 'react'
import './App.css'

import * as React from "react";
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import { useEffect } from 'react';
import apiClient from './services/api';
import Home from './Home';
import ContextWrapper from './context/ContextWrapper';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
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

export default App
