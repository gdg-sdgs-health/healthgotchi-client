import { motion } from "framer-motion";
import { User, LogOut, ChevronRight } from "lucide-react";
import { SiGmail, SiGooglecalendar, SiGooglesheets } from "react-icons/si";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_USER } from "@/data/mock";
import { useLocation } from "wouter";

const containerVars = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVars = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

export default function Profile() {
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    setLocation("/login");
  };

  return (
    <motion.div 
      className="p-6 pb-24"
      variants={containerVars}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVars} className="mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">프로필</h1>
        <p className="text-muted-foreground mt-1 font-medium">내 정보와 설정을 관리하세요</p>
      </motion.div>

      <motion.div variants={itemVars} className="mb-8">
        <Card className="border border-white/40 shadow-xl bg-white/30 backdrop-blur-xl text-gray-800 overflow-hidden rounded-3xl">
          <CardContent className="p-6 flex items-center gap-5 relative">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/10 rounded-full blur-2xl"></div>
            
            <div className="w-16 h-16 rounded-full bg-white/40 flex items-center justify-center shrink-0 border border-white/30 backdrop-blur-md z-10">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div className="relative z-10 flex-1 min-w-0">
              <h2 className="font-bold text-xl mb-1 truncate text-gray-900">{MOCK_USER.name}</h2>
              <p className="text-gray-500 text-sm font-medium mb-1 truncate">{MOCK_USER.email}</p>
              <p className="text-gray-400 text-xs mt-2">가입일: {MOCK_USER.joinedAt}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVars} className="mb-8">
        <h3 className="font-bold text-[15px] text-gray-800 mb-3 px-1">연동된 서비스</h3>
        <Card className="border border-white/40 shadow-sm bg-white/30 backdrop-blur-md rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4 border-b border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-red-50/60 backdrop-blur-sm flex items-center justify-center text-[#EA4335] border border-red-100/30">
                  <SiGmail className="w-4 h-4" />
                </div>
                <span className="font-semibold text-sm">Gmail</span>
              </div>
              <Badge variant="outline" className="bg-green-50/60 text-green-600 border-green-200/30 backdrop-blur-sm rounded-lg">
                연결됨
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 border-b border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50/60 backdrop-blur-sm flex items-center justify-center text-[#4285F4] border border-blue-100/30">
                  <SiGooglecalendar className="w-4 h-4" />
                </div>
                <span className="font-semibold text-sm">Google Calendar</span>
              </div>
              <Badge variant="outline" className="bg-green-50/60 text-green-600 border-green-200/30 backdrop-blur-sm rounded-lg">
                연결됨
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-green-50/60 backdrop-blur-sm flex items-center justify-center text-[#34A853] border border-green-100/30">
                  <SiGooglesheets className="w-4 h-4" />
                </div>
                <span className="font-semibold text-sm">Google Sheets</span>
              </div>
              <Badge variant="outline" className="bg-green-50/60 text-green-600 border-green-200/30 backdrop-blur-sm rounded-lg">
                연결됨
              </Badge>
            </div>
          </CardContent>
        </Card>
        <p className="text-xs font-medium text-gray-500 mt-3 px-1 flex items-center gap-1.5">
          <span className="text-base">💡</span> 구글 워크스페이스 데이터를 자동으로 동기화합니다
        </p>
      </motion.div>

      <motion.div variants={itemVars} className="space-y-3 mb-10">
        <button className="w-full flex items-center justify-between p-4 bg-white/40 backdrop-blur-md rounded-2xl shadow-sm border border-white/30 hover:bg-white/50 transition-all text-left">
          <div className="flex items-center gap-3">
            <span className="text-xl">🛡</span>
            <span className="font-semibold text-gray-800 text-[15px]">개인정보 보호</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
        
        <button className="w-full flex items-center justify-between p-4 bg-white/40 backdrop-blur-md rounded-2xl shadow-sm border border-white/30 hover:bg-white/50 transition-all text-left">
          <div className="flex items-center gap-3">
            <span className="text-xl">❓</span>
            <span className="font-semibold text-gray-800 text-[15px]">도움말 & 지원</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </motion.div>

      <motion.div variants={itemVars}>
        <Button 
          variant="outline" 
          className="w-full rounded-2xl h-14 border-red-200/50 bg-white/20 backdrop-blur-md text-red-500 hover:bg-red-50/50 hover:text-red-600 font-bold text-[15px] gap-2"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          로그아웃
        </Button>
      </motion.div>
    </motion.div>
  );
}
