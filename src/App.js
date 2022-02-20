import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import  Dashboard  from './components/dashboard/index';

function App() {
  return (
  <Routes>
   <Route path="/" element={<Dashboard/>} exact />
  </Routes>
  );
}

export default App;
