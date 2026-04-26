import { motion } from "framer-motion";
import { User, LogOut, ChevronRight } from "lucide-react";
import { SiGmail, SiGooglecalendar, SiGooglesheets } from "react-icons/si";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_USER } from "@/data/mock";

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
        <Card className="border-none shadow-md bg-linear-to-br from-primary to-pink-400 text-white overflow-hidden">
          <CardContent className="p-6 flex items-center gap-5 relative">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center shrink-0 border border-white/30 backdrop-blur-sm z-10">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="relative z-10 flex-1 min-w-0">
              <h2 className="font-bold text-xl mb-1 truncate">{MOCK_USER.name}</h2>
              <p className="text-white/80 text-sm font-medium mb-1 truncate">{MOCK_USER.email}</p>
              <p className="text-white/60 text-xs mt-2">가입일: {MOCK_USER.joinedAt}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVars} className="mb-8">
        <h3 className="font-bold text-[15px] text-gray-800 mb-3 px-1">연동된 서비스</h3>
        <Card className="border-2 border-dashed border-blue-200/60 shadow-none bg-white/50">
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4 border-b border-gray-100/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center text-[#EA4335]">
                  <SiGmail className="w-4 h-4" />
                </div>
                <span className="font-semibold text-sm">Gmail</span>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200/50 rounded-lg">
                연결됨
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 border-b border-gray-100/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-[#4285F4]">
                  <SiGooglecalendar className="w-4 h-4" />
                </div>
                <span className="font-semibold text-sm">Google Calendar</span>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200/50 rounded-lg">
                연결됨
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center text-[#34A853]">
                  <SiGooglesheets className="w-4 h-4" />
                </div>
                <span className="font-semibold text-sm">Google Sheets</span>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200/50 rounded-lg">
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
        <button className="w-full flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all text-left">
          <div className="flex items-center gap-3">
            <span className="text-xl">🛡</span>
            <span className="font-semibold text-gray-800 text-[15px]">개인정보 보호</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
        
        <button className="w-full flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all text-left">
          <div className="flex items-center gap-3">
            <span className="text-xl">❓</span>
            <span className="font-semibold text-gray-800 text-[15px]">도움말 & 지원</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </motion.div>

      <motion.div variants={itemVars}>
        <Button variant="outline" className="w-full rounded-2xl h-14 border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 font-bold text-[15px] gap-2">
          <LogOut className="w-4 h-4" />
          로그아웃
        </Button>
      </motion.div>
    </motion.div>
  );
}
