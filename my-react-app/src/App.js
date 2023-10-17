import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Chat from "./components/pages/chat";
import Lists from "./components/pages/lists";
import Addastore from "./components/pages/addastore";
import Signin from './components/pages/signin';
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
          <Route path='/addastore' element={<Addastore />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/lists' element={<Lists />} />
        </Routes>
      </div>
    </>
  );
}
export default App;
