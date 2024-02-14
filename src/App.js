import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

// Pages
import { HomePage } from "./pages/HomePage.js";
import { AddResort } from "./pages/AddResort.js";
import { SingleResort } from "./pages/SingleResort.js";
import { ModResort } from "./pages/ModResort.js";
import { DelResort } from "./pages/DelResort.js";
import { LoginPage } from "./pages/LoginPage.js";
import { SingleResortGuest } from "./pages/SingleResortGuest.js";
import { HomePageGuest } from "./pages/HomePageGuest.js";

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePageGuest />}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/resorts" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="/add-resort" element={<PrivateRoute><AddResort /></PrivateRoute>} />
          <Route path="/resort/:szallasId" element={<PrivateRoute><SingleResort /></PrivateRoute>} />
          <Route path="/guestview/:szallasId" element={<SingleResortGuest />} />
          <Route path="/mod-resort/:szallasId" element={<PrivateRoute><ModResort /></PrivateRoute>} />
          <Route path="/del-resort/:szallasId" element={<PrivateRoute><DelResort /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

// Navbar Component
function Navbar() {
  const location = useLocation();

  // Hide navbar on login page
  if(location.pathname.includes("/login")){
    return null;
  }
  if (location.pathname === '/' || location.pathname.includes('/guestview')) {
    return (<nav className="navbar navbar-expand-sm navbar-dark bg-dark">
    <ul className="navbar-nav">
      <li className="nav-item">
        <NavLink to={`/`} className="nav-link">
          <span className="nav-link">Főoldal</span>
        </NavLink>
      </li>
    </ul>
    <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
      <ul className="navbar-nav">
      <li className="nav-item">
        <NavLink to={`/login`} className="nav-link">
          <span className="nav-link">Bejelentkezés</span>
        </NavLink>
      </li>
      </ul>
      </div>
  </nav>);
}

return (
  <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
    <ul className="navbar-nav">
      <div className="d-flex justify-content-start">
      <li className="nav-item">
        <NavLink to={`/resorts`} className="nav-link">
          <span className="nav-link">Főoldal</span>
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={`/add-resort`} className="nav-link">
          <span className="nav-link">Szállás hozzáadása</span>
        </NavLink>
      </li>
      </div>
    </ul>
    <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
      <ul className="navbar-nav">
      <li className="nav-item">
        <NavLink to={`/`} className="nav-link">
          <span className="nav-link">Kijelentkezés</span>
        </NavLink>
      </li>
      </ul>
    </div>
  </nav>
);
}

// PrivateRoute Component
function PrivateRoute({ children }) {
  const isAuthed = true; // Implement your authentication logic here

  // If not authenticated, redirect to login page
  if (!isAuthed) {
    return <Navigate to="/" />;
  }

  // If authenticated, render children
  return children;
}

export default App;
