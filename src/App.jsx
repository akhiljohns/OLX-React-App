import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Routes from react-router-dom
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Login from "./Pages/Login";

import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />/
          <Route path="/login" element={<Login />} />/
        </Routes> 
      </Router>
    </div>
  );
}

export default App;
