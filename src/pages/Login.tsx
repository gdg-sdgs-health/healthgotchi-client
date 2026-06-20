import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Sparkles, ShieldCheck, Zap } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export default function Login() {
  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/oauth2/authorization/google`;
  };

  return (
    <div className="h-screen w-full flex items-center justify-center p-6 relative overflow-hidden bg-[#f8f9ff]">
      {/* Dynamic Background Elements */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          x: [0, 50, 0],
          y: [0, 30, 0] 
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px]"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
          x: [0, -40, 0],
          y: [0, -50, 0] 
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-300/10 rounded-full blur-[100px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[400px] relative z-10 flex flex-col items-center"
      >
        {/* Logo Area */}
        <div className="relative mb-8">
          <motion.div 
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0] 
            }}
            transition={{ 
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
            className="w-28 h-28 bg-white/40 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/50 flex items-center justify-center text-6xl relative z-10"
          >
            🐣
          </motion.div>
          <div className="absolute -inset-6 bg-primary/15 blur-3xl rounded-full animate-pulse" />
        </div>
        
        <div className="space-y-4 mb-14 text-center">
          <h1 className="text-5xl font-[900] tracking-[0.2em] text-gray-900 uppercase font-sans ml-[0.2em]">
            Care<span className="text-primary">gochi</span>
          </h1>
          <p className="text-gray-400 font-semibold leading-relaxed text-sm tracking-wide">
            당신의 건강 데이터를 먹고 자라는 <br />
            특별한 AI 동반자
          </p>
        </div>

        {/* Google Login Wrapper */}
        <div className="w-full flex justify-center relative">
          <div className="absolute inset-0 bg-primary/5 blur-2xl rounded-full scale-150" />
          <div className="relative">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center gap-3 bg-white border border-gray-200 rounded-full px-6 py-3 shadow-sm hover:shadow-md transition-all font-semibold text-gray-700 text-sm"
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/>
                <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z"/>
                <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z"/>
                <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.31z"/>
              </svg>
              Google로 계속하기
            </button>
          </div>
        </div>

        <p className="mt-12 text-[10px] text-gray-400 font-bold uppercase tracking-[0.1em] text-center opacity-60">
          By continuing, you agree to our <br />
          <span className="underline cursor-pointer hover:text-primary transition-colors">Terms</span> & <span className="underline cursor-pointer hover:text-primary transition-colors">Privacy Policy</span>
        </p>
      </motion.div>
    </div>
  );
}
