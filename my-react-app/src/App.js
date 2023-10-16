import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Chat from "./components/pages/chat"
import Lists from "./components/pages/lists"
import Home from './components/pages/home';
import { Route, Routes } from "react-router-dom";
import LoginButton from './components/Loginbutton';
import LogoutButton from './components/Logoutbutton';

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/lists' element={<Lists />} />
        </Routes>
      </div>
    </>
  );
}
export default App;
