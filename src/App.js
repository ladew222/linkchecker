import logo from './logo.svg';
import './App.css';
import Signin from './components/Signin';
import Register from './components/Register';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Profile from './components/Profile';
import Navbar from './components/Navbar'

function App() {
  const [token, setToken] = useState(localStorage.getItem('accessToken'));

  useEffect(() => {
    setToken( localStorage.getItem('accessToken'));
  }, [])

  if (!token){
    return (
      <div>
       <Router basename={'app'}>
          <Routes >
           <Route path="/register" caseSensitive={false} element={<Register/>} />
           <Route path="/signin" caseSensitive={false} element={ <Signin />} />
          <Route render={() => <Navigate to="/register" replace={true} />} />
          </Routes>
          <Signin />
          </Router>
      </div>
    )
    }
    else {
      return (
        <div>
          <Navbar/>
          <Router basename={'app'}>
          <Routes >
            <Route path="/profile" caseSensitive={false} element={<Profile />} />
          </Routes>
          </Router>
        </div>
      );

    }
    
  }
export default App;
