import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginForm from '../loginForm/Loginform';
import { SignupForm } from '../signupform/Signupform';
import ProtectedRoute from '../protectedroute/routing';
import DashboardLayout from '../../pages/dashboardlayout/DashboardLayout';

export default function Navigation() {
  return (

    <BrowserRouter>
      <Routes>
    <Route path="/" element={<LoginForm />} />
    <Route path="/signup" element={<SignupForm />} />
    <Route path="/dashboard" element={<DashboardLayout />} /> 
  </Routes>
    </BrowserRouter>
  );
}
