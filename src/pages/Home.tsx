import { motion } from "framer-motion";
import { Link } from "wouter";
import { Heart, Activity, TrendingUp, ChevronRight, Pill, Moon, Camera, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import api from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import type { UserResponse, CharacterResponse, TodayMissionResponse, PrescriptionAnalysisResponse } from "@/types/api";

const containerVars = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVars = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

const fetchUser = () =>
  api.get<{ data: UserResponse }>("/api/users/me").then((r) => r.data.data);

const fetchCharacter = () =>
  api.get<{ data: CharacterResponse }>("/api/characters/me").then((r) => r.data.data);

const fetchTodayMissions = () =>
  api.get<{ data: TodayMissionResponse[] }>("/api/missions/today").then((r) => r.data.data);

const CATEGORY_ICON_MAP: Record<string, string> = {
  medication: "pill",
  exercise: "activity",
  sleep: "moon",
};

export default function Home() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const { data: user } = useQuery({ queryKey: ["user"], queryFn: fetchUser });
  const { data: character } = useQuery({ queryKey: ["character"], queryFn: fetchCharacter });
  const { data: todayMissions } = useQuery({ queryKey: ["missions/today"], queryFn: fetchTodayMissions });

  const recentActivity = (todayMissions ?? [])
    .filter((m) => m.isCompleted)
    .slice(0, 3)
    .map((m) => ({
      id: m.missionId,
      title: m.title,
      time: m.completedAt ? formatRelativeTime(m.completedAt) : "",
      status: "완료",
      icon: CATEGORY_ICON_MAP[m.category] ?? "activity",
      color: "bg-blue-100 text-blue-600",
    }));

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "activity": return <Activity className="w-4 h-4" />;
      case "pill": return <Pill className="w-4 h-4" />;
      case "moon": return <Moon className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const handleUpload = () => {
    if (isAnalyzing) return;
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg,image/png,image/jpg,application/pdf";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      setIsAnalyzing(true);
      try {
        const formData = new FormData();
        formData.append("prescription", file);

        const response = await api.post<PrescriptionAnalysisResponse>(
          "https://famous-blowfish-plainly.ngrok-free.app/api/prescription/analyze",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "ngrok-skip-browser-warning": "true",
            },
          }
        );

        const result = response.data;
        if (result.success) {
          toast({
            title: "처방전 분석 완료",
            description: result.message,
          });
          queryClient.invalidateQueries({ queryKey: ["missions/today"] });
        } else {
          toast({
            title: "분석 실패",
            description: result.message || "처방전 분석에 실패했습니다.",
            variant: "destructive",
          });
        }
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "처방전 분석 중 오류가 발생했습니다.";
        toast({
          title: "오류",
          description: message,
          variant: "destructive",
        });
      } finally {
        setIsAnalyzing(false);
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
            안녕하세요{user ? `, ${user.name}님` : ""}! <span className="inline-block animate-wave origin-[70%_70%]"></span>
          </h1>
          <p className="text-muted-foreground mt-1 font-medium">건강한 하루를 시작해볼까요?</p>
        </div>
        <Button
          onClick={handleUpload}
          variant="outline"
          size="icon"
          disabled={isAnalyzing}
          className="rounded-2xl w-12 h-12 shadow-sm border-primary/20 hover:bg-primary/5 hover:text-primary transition-all"
        >
          {isAnalyzing ? <Loader2 className="w-6 h-6 animate-spin" /> : <Camera className="w-6 h-6" />}
        </Button>
      </motion.div>

      <motion.div variants={itemVars}>
        <Card className="border border-white/40 shadow-xl overflow-hidden bg-white/40 backdrop-blur-xl mb-6 rounded-3xl">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="font-bold text-lg text-gray-800">
                {character?.name ?? "나의 케어고치"}
              </h2>
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-white/40 hover:bg-white/40 backdrop-blur-md text-primary border border-white/30 shadow-sm rounded-xl">
                  Lv.{character?.level ?? "-"}
                </Badge>
                <Badge variant="secondary" className="bg-orange-50/60 hover:bg-orange-50/60 backdrop-blur-md text-orange-600 border border-orange-100/30 shadow-sm rounded-xl">
                  🔥 {character?.totalStreak ?? 0}일 연속 달성 중
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
                <span className="text-primary">{character?.exp ?? 0}% / 100%</span>
              </div>
              <Progress value={character?.exp ?? 0} className="h-3 bg-white/30" />
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
            <p className="text-lg font-bold text-gray-800">{character?.healthStat ?? "-"}%</p>
          </CardContent>
        </Card>

        <Card className="border border-white/40 shadow-md bg-blue-50/30 backdrop-blur-md rounded-2xl">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100/50 backdrop-blur-sm flex items-center justify-center text-blue-500 mb-1">
              <Activity className="w-4 h-4" />
            </div>
            <p className="text-xs font-semibold text-gray-500">활력</p>
            <p className="text-lg font-bold text-gray-800">{character?.vitalityStat ?? "-"}%</p>
          </CardContent>
        </Card>

        <Card className="border border-white/40 shadow-md bg-yellow-50/30 backdrop-blur-md rounded-2xl">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
            <div className="w-8 h-8 rounded-full bg-yellow-100/50 backdrop-blur-sm flex items-center justify-center text-yellow-600 mb-1">
              <TrendingUp className="w-4 h-4" />
            </div>
            <p className="text-xs font-semibold text-gray-500">기분</p>
            <p className="text-lg font-bold text-gray-800">{character?.moodStat ?? "-"}%</p>
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
          {recentActivity.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">오늘 완료한 미션이 없습니다.</p>
          ) : (
            recentActivity.map((activity) => (
              <Card key={activity.id} className="border border-white/30 shadow-sm bg-white/30 backdrop-blur-md rounded-2xl hover:bg-white/40 transition-all">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 backdrop-blur-sm ${activity.color}`}>
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
            ))
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function formatRelativeTime(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "방금 전";
  if (hours < 24) return `${hours}시간 전`;
  return `${Math.floor(hours / 24)}일 전`;
}
