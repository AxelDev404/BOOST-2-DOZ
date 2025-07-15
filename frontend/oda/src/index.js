import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Note from './pages/Note';
import Persona from './pages/Persona';
import Prodotto from './pages/Prodotto';
import Dashboard from './pages/Dashboard';


import PrivateRoute from './components/PrivateRoute';
import { isAuthenticated } from './utils/auth';



import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<App />} />
        <Route path="/note" element={<Note />} />
        <Route path='/persona' element={<Persona/>} />
        <Route path='/prodotto' element={<Prodotto/>}/>
        
        {/*ROTTE PROTETTE */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Altre pagine protette qui */}
        </Route>
      
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
