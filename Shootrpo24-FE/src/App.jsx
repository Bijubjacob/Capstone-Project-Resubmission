import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import ExamplesWaitlist from "./components/ExamplesWaitlist";
import SignUp from "./components/signup_form/Index";
import LoginForm from "./components/login_form/Index";
import AuthProvider from "./context/auth/auth_context";
import AuthPage from "./pages/auth/Index";
import ProtectedRoutes from "./components/signup_form/ProtectedRoutes";
import Dashboard from "./pages/dashboard/Index";
import Navbar from "./components/navbar/Index";

const App = () => {
  const [newUser, setNewUser] = React.useState(true);

  return (
    <CookiesProvider>
      <AuthProvider>
        <Router>
          <Navbar /> {/* Moved outside of Routes */}
          <main>
            {" "}
            {/* Added main wrapper for content */}
            <Routes>
              <Route path="/" element={<ExamplesWaitlist />} />
              <Route
                path="/signup"
                element={<SignUp setNewUser={setNewUser} />}
              />
              <Route
                path="/login"
                element={<LoginForm setNewUser={setNewUser} />}
              />
              <Route path="/auth" element={<AuthPage />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
              <Route path="*" element={<h1>404: Not Found</h1>} />
            </Routes>
          </main>
        </Router>
      </AuthProvider>
    </CookiesProvider>
  );
};

export default App;