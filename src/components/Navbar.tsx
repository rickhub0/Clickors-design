import React from "react";
import { ArrowUpRight, LogOut, Layout } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: "Home", href: "/#home" },
    { name: "Services", href: "/#services" },
    { name: "Work", href: "/#work" },
    { name: "Process", href: "/#process" },
    { name: "Pricing", href: "/#pricing" },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    if (href.startsWith("/#") && location.pathname === "/") {
      e.preventDefault();
      const id = href.replace("/#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-8 lg:px-16 py-3 flex items-center justify-between pointer-events-none">
      {/* Left: Logo */}
      <div className="flex items-center pointer-events-auto">
        <Link to="/" className="h-12 w-12 bg-white/10 rounded-xl flex items-center justify-center liquid-glass group">
            <span className="font-heading italic text-xl group-hover:scale-110 transition-transform">C</span>
        </Link>
      </div>

      {/* Center: Links */}
      <div className="hidden md:flex items-center gap-1 liquid-glass rounded-full px-1.5 py-1 pointer-events-auto">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            onClick={(e) => handleScroll(e, link.href)}
            className="px-3 py-2 text-sm font-medium text-foreground/90 font-body hover:text-white transition-colors"
          >
            {link.name}
          </Link>
        ))}
        {!isAuthenticated && (
          <Link to="/auth" className="bg-white text-black rounded-full px-4 py-1.5 text-sm font-medium flex items-center gap-1 hover:bg-white/90 transition-colors ml-2">
            Get Started
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Right: CTA (Mobile or secondary) */}
      <div className="flex items-center gap-4 pointer-events-auto">
        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            <Link to="/dashboard" className="hidden md:flex liquid-glass rounded-full px-4 py-1.5 text-xs font-medium text-white/80 hover:bg-white/10 items-center gap-2">
              <Layout className="w-3 h-3" />
              Dashboard
            </Link>
            <button 
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="liquid-glass rounded-full p-2 text-white/50 hover:text-white"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <Link to="/auth" className="md:hidden bg-white text-black rounded-full px-4 py-1.5 text-sm font-medium">
            Get Started
          </Link>
        )}
        <div className="hidden md:block w-12"></div> {/* Spacer to keep center balanced */}
      </div>
    </nav>
  );
}

