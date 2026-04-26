import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Dumbbell, Apple, Pill, Activity, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { SiGmail, SiGooglecalendar, SiGooglesheets } from "react-icons/si";
import { MISSIONS } from "@/data/mock";

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

export default function Missions() {
  const [missions, setMissions] = useState(MISSIONS);
  
  const completedCount = missions.filter(m => m.completed).length;
  const totalCount = missions.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const toggleMission = (id: number) => {
    setMissions(missions.map(m => 
      m.id === id ? { ...m, completed: !m.completed } : m
    ));
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "Gmail": return <SiGmail className="text-[#EA4335] w-3 h-3" />;
      case "Calendar": return <SiGooglecalendar className="text-[#4285F4] w-3 h-3" />;
      case "Sheets": return <SiGooglesheets className="text-[#34A853] w-3 h-3" />;
      default: return null;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "medication": return <Pill className="w-5 h-5 text-red-400" />;
      case "exercise": return <Dumbbell className="w-5 h-5 text-blue-400" />;
      case "food": return <Apple className="w-5 h-5 text-green-400" />;
      case "mindfulness": return <Activity className="w-5 h-5 text-purple-400" />;
      default: return <Activity className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <motion.div 
      className="p-6 pb-24"
      variants={containerVars}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVars} className="mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">오늘의 미션</h1>
        <p className="text-muted-foreground mt-1 font-medium">{completedCount}/{totalCount} 완료</p>
      </motion.div>

      <motion.div variants={itemVars} className="mb-8">
        <Card className="border-none shadow-md bg-linear-to-r from-primary to-pink-400 text-white overflow-hidden">
          <CardContent className="p-6 relative">
            {/* Decorative background shapes */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            
            <div className="relative z-10">
              <h2 className="font-bold text-lg mb-1">오늘의 달성률 {progressPercent}%</h2>
              <p className="text-white/80 text-sm font-medium mb-4">
                {totalCount - completedCount}개 미션이 남았어요!
              </p>
              
              <div className="bg-black/20 rounded-full h-3 overflow-hidden">
                <motion.div 
                  className="h-full bg-white rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVars} className="space-y-3">
        {missions.map((mission) => (
          <Card 
            key={mission.id} 
            className={`border-none shadow-sm transition-all duration-200 cursor-pointer overflow-hidden
              ${mission.completed ? 'bg-gray-50 opacity-75' : 'bg-white hover:shadow-md'}`}
            onClick={() => toggleMission(mission.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="pt-1">
                  <Checkbox 
                    checked={mission.completed} 
                    onCheckedChange={() => toggleMission(mission.id)}
                    className={`w-6 h-6 rounded-full border-2 transition-colors
                      ${mission.completed ? 'bg-primary border-primary' : 'border-gray-300'}`}
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className={`font-bold text-[16px] transition-all
                    ${mission.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                    {mission.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 mb-3 line-clamp-1">{mission.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-gray-100 text-gray-600 border-none px-2 py-0.5 rounded-lg flex gap-1.5 items-center">
                      <Clock className="w-3 h-3" /> {mission.time}
                    </Badge>
                    <Badge variant="outline" className="bg-gray-100 text-gray-600 border-none px-2 py-0.5 rounded-lg flex gap-1.5 items-center">
                      {getSourceIcon(mission.source)} {mission.source}
                    </Badge>
                    {mission.streak > 0 && (
                      <Badge variant="secondary" className="bg-orange-50 text-orange-600 hover:bg-orange-50 border-none px-2 py-0.5 rounded-lg">
                        🔥 {mission.streak}일 연속
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 
                  ${mission.completed ? 'bg-gray-200 grayscale' : 'bg-gray-50'}`}>
                  {getCategoryIcon(mission.category)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </motion.div>
  );
}
