import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './components/Profile';
import Home from "./pages/home/Home"
import Login from "./components/Login.js"
import Register from "./components/Register.js"
import GoogleAuth from "./components/GoogleAuth.js"


function App() {
  
  const BACKEND_URL = "https://mysocialserver-626bbb68c54b.herokuapp.com";
  return (
    <div>
       <Router>
       
      <Routes>
        <Route path="/" element={<Login BACKEND_URL={BACKEND_URL} />} />
        <Route path="/home" element={<Home BACKEND_URL={BACKEND_URL} />} />
        <Route path="/profile" element={<Profile  BACKEND_URL={BACKEND_URL}/>} />
        <Route path="/register" element={<Register  BACKEND_URL={BACKEND_URL}/>} />
        <Route path="/googleauth" element={<GoogleAuth  BACKEND_URL={BACKEND_URL}/>} />
      </Routes>
    
    </Router>
    </div>
   
  );
}

export default App;
