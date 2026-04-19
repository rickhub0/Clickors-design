import React, { useState } from "react";
import { ArrowRight, Mail, Lock, User, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import VideoBackground from "../components/VideoBackground";

export default function AuthPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    if (!isLogin && !name) {
      setError("Please enter your name.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      navigate("/dashboard");
    } catch (err) {
      setError(isLogin ? "Invalid credentials. Please try again." : "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
      <VideoBackground
        src="https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />
      
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md p-8 lg:p-12 liquid-glass rounded-[2rem] space-y-8"
      >
        <div className="text-center space-y-2">
          <motion.h2 
            layout
            className="text-4xl font-heading italic text-white"
          >
            {isLogin ? "Welcome Back" : "Join Clickors"}
          </motion.h2>
          <motion.p 
            layout
            className="text-white/50 font-body font-light text-sm"
          >
            {isLogin ? "Enter your credentials to access your dashboard" : "Start your journey into AI-powered design today"}
          </motion.p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="popLayout">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-2xl px-4 py-3 flex items-center gap-3 text-red-200 text-xs"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </motion.div>
            )}

            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-2"
              >
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 ml-4 font-medium">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-6 text-white font-body focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/10"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 ml-4 font-medium">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-6 text-white font-body focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 ml-4 font-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-6 text-white font-body focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/10"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full liquid-glass-strong rounded-full py-5 text-white font-medium flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                {isLogin ? "Sign In" : "Create Account"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-4">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
            }}
            className="text-white/40 text-[10px] uppercase tracking-widest hover:text-white transition-colors"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </button>
        </div>
      </motion.div>
    </section>
  );
}
