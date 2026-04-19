import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import ServicePage from "./pages/ServicePage";
import { AuthProvider } from "./context/AuthContext";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="bg-black min-h-screen text-white selection:bg-white/20 font-body antialiased">
          <Navbar />
          <main className="relative z-10">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/services/:slug" element={<ServicePage />} />
              <Route path="*" element={<LandingPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}
