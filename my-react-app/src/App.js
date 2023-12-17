import React, { useContext, useState } from 'react';
import "./styles.scss";
import Navbar from './components/Navbar.js';
import Home from './components/pages/home.js';
import Chat from "./components/pages/chat.js";
import ThreadContentPage from './components/ThreadContentPage.js';
import Review from './components/pages/review.js';
import ReviewContentPage from './components/ReviewContentPage.js';
import Login from './components/pages/login.js';
import Signin from './components/pages/signin.js';
import Logout from "./components/pages/logout.js";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from './context/AuthContext.js';

function App() {

  const {currentUser} = useContext(AuthContext);
  
  //---APP---
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/thread/:threadId' element={<ThreadContentPage />} />
          <Route path='/review' element={<Review />} />
          <Route path='/review/:markersId' element={<ReviewContentPage />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
        </Routes>
      </div>
    </>
  );
}
export default App;
