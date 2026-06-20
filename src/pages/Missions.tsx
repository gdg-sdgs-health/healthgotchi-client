import { motion } from "framer-motion";
import { Clock, Dumbbell, Apple, Pill, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { SiGmail, SiGooglecalendar, SiGooglesheets } from "react-icons/si";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import type { TodayMissionResponse } from "@/types/api";

const containerVars = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVars = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

const fetchTodayMissions = () =>
  api.get<{ data: TodayMissionResponse[] }>("/api/missions/today").then((r) => r.data.data);

export default function Missions() {
  const queryClient = useQueryClient();

  const { data: missions = [], isLoading } = useQuery({
    queryKey: ["missions/today"],
    queryFn: fetchTodayMissions,
  });

  const completeMutation = useMutation({
    mutationFn: (missionId: number) =>
      api.post(`/api/missions/${missionId}/complete`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["missions/today"] });
      queryClient.invalidateQueries({ queryKey: ["character"] });
    },
  });

  const uncompleteMutation = useMutation({
    mutationFn: (missionId: number) =>
      api.delete(`/api/missions/${missionId}/complete`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["missions/today"] });
      queryClient.invalidateQueries({ queryKey: ["character"] });
    },
  });

  const toggleMission = (mission: TodayMissionResponse) => {
    if (mission.isCompleted) {
      uncompleteMutation.mutate(mission.missionId);
    } else {
      completeMutation.mutate(mission.missionId);
    }
  };

  const completedCount = missions.filter((m) => m.isCompleted).length;
  const totalCount = missions.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

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
        <Card className="border border-white/40 shadow-xl bg-white/30 backdrop-blur-xl text-gray-800 overflow-hidden rounded-3xl">
          <CardContent className="p-6 relative">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-pink-300/10 rounded-full blur-xl"></div>
            <div className="relative z-10">
              <h2 className="font-bold text-lg mb-1">오늘의 달성률 {progressPercent}%</h2>
              <p className="text-gray-500 text-sm font-medium mb-4">
                {totalCount - completedCount}개 미션이 남았어요!
              </p>
              <div className="bg-white/40 border border-white/20 rounded-full h-3 overflow-hidden">
                <motion.div
                  className="h-full bg-linear-to-r from-primary to-pink-400 rounded-full"
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
        {isLoading ? (
          <p className="text-sm text-muted-foreground text-center py-6">미션을 불러오는 중...</p>
        ) : missions.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">오늘의 미션이 없습니다.</p>
        ) : (
          missions.map((mission) => (
            <Card
              key={mission.missionId}
              className={`border border-white/30 shadow-sm transition-all duration-200 cursor-pointer overflow-hidden rounded-2xl
                ${mission.isCompleted ? "bg-white/20 backdrop-blur-xs opacity-60" : "bg-white/40 backdrop-blur-md hover:bg-white/50 hover:shadow-md"}`}
              onClick={() => toggleMission(mission)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="pt-1">
                    <Checkbox
                      checked={mission.isCompleted}
                      onCheckedChange={() => toggleMission(mission)}
                      className={`w-6 h-6 rounded-full border-2 transition-colors
                        ${mission.isCompleted ? "bg-primary border-primary" : "border-gray-300"}`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold text-[16px] transition-all
                      ${mission.isCompleted ? "line-through text-gray-400" : "text-gray-900"}`}>
                      {mission.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 mb-3 line-clamp-1">{mission.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-white/40 text-gray-600 border border-white/30 backdrop-blur-sm px-2 py-0.5 rounded-lg flex gap-1.5 items-center">
                        <Clock className="w-3 h-3" /> {mission.targetTime}
                      </Badge>
                      {mission.contextSource && (
                        <Badge variant="outline" className="bg-white/40 text-gray-600 border border-white/30 backdrop-blur-sm px-2 py-0.5 rounded-lg flex gap-1.5 items-center">
                          {getSourceIcon(mission.contextSource)} {mission.contextSource}
                        </Badge>
                      )}
                      {mission.streakCount > 0 && (
                        <Badge variant="secondary" className="bg-orange-50/60 text-orange-600 hover:bg-orange-50/60 border border-orange-100/30 backdrop-blur-sm px-2 py-0.5 rounded-lg">
                          🔥 {mission.streakCount}일 연속
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-white/30 backdrop-blur-sm
                    ${mission.isCompleted ? "bg-gray-200/50 grayscale" : "bg-white/50"}`}>
                    {getCategoryIcon(mission.category)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </motion.div>
    </motion.div>
  );
}
