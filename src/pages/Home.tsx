import { motion } from "framer-motion";
import { Link } from "wouter";
import { Heart, Activity, TrendingUp, ChevronRight, Pill, Moon, Camera } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { MOCK_USER, RECENT_ACTIVITY } from "@/data/mock";

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

export default function Home() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "activity": return <Activity className="w-4 h-4" />;
      case "pill": return <Pill className="w-4 h-4" />;
      case "moon": return <Moon className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const handleUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log("업로드된 파일:", file.name);
        alert(`${file.name} 처방전 분석을 시작합니다! (추후 AI 분석 기능 연결 예정)`);
      }
    };
    input.click();
  };

  return (
    <motion.div 
      className="p-6 pb-24"
      variants={containerVars}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVars} className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-extrabold flex items-center gap-2">
            안녕하세요! <span className="inline-block animate-wave origin-[70%_70%]"></span>
          </h1>
          <p className="text-muted-foreground mt-1 font-medium">건강한 하루를 시작해볼까요?</p>
        </div>
        <Button 
          onClick={handleUpload}
          variant="outline" 
          size="icon" 
          className="rounded-2xl w-12 h-12 shadow-sm border-primary/20 hover:bg-primary/5 hover:text-primary transition-all"
        >
          <Camera className="w-6 h-6" />
        </Button>
      </motion.div>

      <motion.div variants={itemVars}>
        <Card className="border border-white/40 shadow-xl overflow-hidden bg-white/40 backdrop-blur-xl mb-6 rounded-3xl">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="font-bold text-lg text-gray-800">나의 케어고치</h2>
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-white/40 hover:bg-white/40 backdrop-blur-md text-primary border border-white/30 shadow-sm rounded-xl">
                  Lv.{MOCK_USER.pet.level}
                </Badge>
                <Badge variant="secondary" className="bg-orange-50/60 hover:bg-orange-50/60 backdrop-blur-md text-orange-600 border border-orange-100/30 shadow-sm rounded-xl">
                  🔥 {MOCK_USER.pet.streak}일 연속 달성 중
                </Badge>
              </div>
            </div>

            <div className="relative w-32 h-32 mx-auto my-6 bg-white/60 backdrop-blur-md rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-white/40 animate-[spin_10s_linear_infinite] border-t-primary/40 border-r-transparent border-b-transparent border-l-transparent"></div>
              <span className="text-6xl animate-bounce-slow">🐣</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-semibold">
                <span className="text-gray-700">경험치</span>
                <span className="text-primary">{MOCK_USER.pet.xp}% / 100%</span>
              </div>
              <Progress value={MOCK_USER.pet.xp} className="h-3 bg-white/30" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVars} className="grid grid-cols-3 gap-3 mb-8">
        <Card className="border border-white/40 shadow-md bg-red-50/30 backdrop-blur-md rounded-2xl">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
            <div className="w-8 h-8 rounded-full bg-red-100/50 backdrop-blur-sm flex items-center justify-center text-red-500 mb-1">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <p className="text-xs font-semibold text-gray-500">건강</p>
            <p className="text-lg font-bold text-gray-800">{MOCK_USER.stats.health}%</p>
          </CardContent>
        </Card>
        
        <Card className="border border-white/40 shadow-md bg-blue-50/30 backdrop-blur-md rounded-2xl">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100/50 backdrop-blur-sm flex items-center justify-center text-blue-500 mb-1">
              <Activity className="w-4 h-4" />
            </div>
            <p className="text-xs font-semibold text-gray-500">활력</p>
            <p className="text-lg font-bold text-gray-800">{MOCK_USER.stats.energy}%</p>
          </CardContent>
        </Card>
        
        <Card className="border border-white/40 shadow-md bg-yellow-50/30 backdrop-blur-md rounded-2xl">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
            <div className="w-8 h-8 rounded-full bg-yellow-100/50 backdrop-blur-sm flex items-center justify-center text-yellow-600 mb-1">
              <TrendingUp className="w-4 h-4" />
            </div>
            <p className="text-xs font-semibold text-gray-500">기분</p>
            <p className="text-lg font-bold text-gray-800">{MOCK_USER.stats.mood}%</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVars}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">최근 활동</h2>
          <Link href="/missions" className="text-sm font-medium text-primary flex items-center hover:underline">
            전체보기 <ChevronRight className="w-4 h-4 ml-0.5" />
          </Link>
        </div>
        
        <div className="space-y-3">
          {RECENT_ACTIVITY.map((activity) => (
            <Card key={activity.id} className="border border-white/30 shadow-sm bg-white/30 backdrop-blur-md rounded-2xl hover:bg-white/40 transition-all">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 backdrop-blur-sm ${activity.color.replace('bg-', 'bg-')}/70`}>
                  {getIcon(activity.icon)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[15px] text-gray-800 truncate">{activity.title}</h3>
                  <div className="flex items-center text-xs text-muted-foreground mt-0.5 gap-2">
                    <span>{activity.time}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span className="font-medium text-primary">{activity.status}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
