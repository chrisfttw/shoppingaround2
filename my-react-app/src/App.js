import React, { useContext, useState } from 'react';
import './App.css';
import "./styles.scss";
import Navbar from './components/Navbar';
import Chat from "./components/pages/chat";
import Lists from "./components/pages/lists";
import Logout from "./components/pages/logout";
import Addastore from "./components/pages/addastore";
import Signin from './components/pages/signin';
import Home from './components/pages/home';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginButton from './components/Loginbutton';
import LogoutButton from './components/Logoutbutton';
import Login from './components/pages/login';
import { AuthContext } from './context/AuthContext';

function App() {

  const {currentUser} = useContext(AuthContext);
  
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/addastore' element={<Addastore />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/login' element={<Login />} />
          <Route path='/lists' element={<Lists />} />
          <Route path='/logout' element={<Logout />} />
        </Routes>
      </div>
    </>
  );
}
export default App;
