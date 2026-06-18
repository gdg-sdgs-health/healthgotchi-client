import { GoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { Sparkles, ShieldCheck, Zap } from "lucide-react";

export default function Login() {
  const [, setLocation] = useLocation();

  const handleSuccess = (credentialResponse: any) => {
    localStorage.setItem("auth_token", credentialResponse.credential);
    setLocation("/");
  };

  const handleError = () => {
    alert("로그인에 실패했습니다. 다시 시도해주세요.");
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
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleError}
              useOneTap
              shape="pill"
              theme="outline"
              size="large"
              width="250px"
              text="continue_with"
            />
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
