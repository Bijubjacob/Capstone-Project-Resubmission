import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthPage from './pages/auth/Index';
import LoginForm from './pages/login_form/Index';
import SignUp from './pages/signup_form/Index';
import Dashboard from './pages/Usersdashboard/Index';
import AdminDashboard from './pages/AdminDashboard/adminDashboard'; 
import ProtectedRoutes from './components/ProtectedRoutes'; 
import ExamplesWaitlist from './pages/public/ExamplesWaitlist';
import AboutUs from './pages/public/AboutUs';
import FAQ from './pages/public/FAQ';
import Blog from './pages/public/Blog';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ExamplesWaitlist />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/AboutUs" element={<AboutUs />} />
      <Route path="/FAQ" element={<FAQ />} />
      <Route path="/Blog" element={<Blog />} />

      {/* Protected route for Dashboard */}
      <Route element={<ProtectedRoutes />}>
        <Route path='/dashboard' element={<Dashboard />} />
      </Route>

      {/* Protected route for Admin Dashboard */}
      <Route element={<ProtectedRoutes />}>
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
      </Route>

      {/* Catch-all route for 404 */}
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}

export default App;
