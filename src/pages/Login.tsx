import { GoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";

export default function Login() {
  const [, setLocation] = useLocation();

  const handleSuccess = (credentialResponse: any) => {
    console.log("Login Success:", credentialResponse);
    // 실제 서비스에서는 여기서 백엔드로 토큰을 보내 검증해야 합니다.
    // 지금은 로컬 스토리지에 저장하고 메인으로 이동합니다.
    localStorage.setItem("auth_token", credentialResponse.credential);
    setLocation("/");
  };

  const handleError = () => {
    console.log("Login Failed");
    alert("로그인에 실패했습니다. 다시 시도해주세요.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-linear-to-b from-primary/5 to-primary/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-md">
          <CardContent className="p-8 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <span className="text-5xl animate-bounce-slow">🐣</span>
            </div>
            
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
              케어고치
            </h1>
            <p className="text-muted-foreground mb-8 font-medium">
              건강한 습관의 시작, <br />
              구글 계정으로 간편하게 시작하세요.
            </p>

            <div className="w-full flex justify-center py-4">
              <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
                useOneTap
                shape="pill"
                theme="filled_blue"
                size="large"
                text="signin_with"
              />
            </div>

            <p className="mt-8 text-xs text-muted-foreground leading-relaxed">
              로그인 시 케어고치의 서비스 이용약관 및 <br />
              개인정보 처리방침에 동의하게 됩니다.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
