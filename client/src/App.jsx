
import { useState } from 'react'
import './App.css'
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import {router} from './router/router';

function App() {

  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
   <RouterProvider router = {router}></RouterProvider>
    </>
  );
}

export default App
