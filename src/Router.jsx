import React from 'react';
import { Route, Routes } from "react-router-dom";
import App from './App'
import HeadPage from './home-components/headPage/HeadPage'

const Router = () => {
  return (
    
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route path="/home" element={<HeadPage /> } />
    </Routes>
  )
}

export default Router