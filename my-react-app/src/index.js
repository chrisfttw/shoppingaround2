import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
//import "./styles.css"
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </AuthContextProvider>
);

