import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import LoginForm  from '../loginForm/Loginform';
import { SignupForm } from '../signupform/Signupform';

export default function Navigation() {
  return (
    <BrowserRouter>
    

      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />

      </Routes>
    </BrowserRouter>
  );
}
