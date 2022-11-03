import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Rentals from './pages/Rentals';
import Rooms from "./pages/Rooms"
import './App.css';

const App = () => {
  return(
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rentals" element={<Rentals />} />
      <Route path="/rooms" element={<Rooms />} />
    </Routes>
  )
};

export default App;
