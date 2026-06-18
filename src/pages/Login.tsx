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
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#f8f9ff]">
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
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[400px] relative z-10"
      >
        <Card className="border border-white/40 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] bg-white/40 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden">
          <CardContent className="p-10 flex flex-col items-center">
            {/* Logo Area */}
            <div className="relative mb-10">
              <motion.div 
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-24 h-24 bg-white/60 backdrop-blur-md rounded-[2rem] shadow-xl border border-white/50 flex items-center justify-center text-6xl relative z-10"
              >
                🐣
              </motion.div>
              <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full animate-pulse" />
            </div>
            
            <div className="space-y-4 mb-12 text-center">
              <h1 className="text-4xl font-[900] tracking-[0.15em] text-gray-900 uppercase font-sans">
                Care<span className="text-primary">gochi</span>
              </h1>
              <p className="text-gray-500 font-medium leading-relaxed text-sm">
                당신의 건강 데이터를 먹고 자라는 <br />
                특별한 AI 동반자
              </p>
            </div>

            {/* Google Login Wrapper with custom styling hint */}
            <div className="w-full relative group">
              <div className="absolute -inset-1 bg-linear-to-r from-primary/20 to-pink-300/20 blur opacity-0 group-hover:opacity-100 transition duration-500 rounded-full" />
              <div className="relative flex justify-center">
                <GoogleLogin
                  onSuccess={handleSuccess}
                  onError={handleError}
                  useOneTap
                  shape="pill"
                  theme="filled_blue"
                  size="large"
                  width="320px"
                  text="continue_with"
                />
              </div>
            </div>

            <p className="mt-10 text-[11px] text-gray-400 font-medium text-center leading-relaxed">
              시작함으로써 케어고치의 <span className="text-primary/70 underline cursor-pointer">이용약관</span> 및 <br />
              <span className="text-primary/70 underline cursor-pointer">개인정보 처리방침</span>에 동의하게 됩니다.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
