import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import Profile from './components/Home/Profile/Profile';
function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/' element={<LandingPage />} />
          <Route path='/home/*' element={<Home />} /> {/* Protecting Home route */}
          <Route path='/profile' element={<Profile />} /> {/* Protecting Profile route */}
        </Routes>
      </BrowserRouter>
  );
}

export default App;
