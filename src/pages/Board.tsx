import { motion } from "framer-motion";
import { MessageCircleHeart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type { BoardPostResponse, PageResponse } from "@/types/api";

const containerVars = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVars = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

const EMOJIS = ["🐣", "🐻", "🐰", "🦊", "🐧", "🐸", "🐱", "🐶"];
const COLORS = ["bg-yellow-100", "bg-blue-100", "bg-green-100", "bg-orange-100", "bg-purple-100"];

const fetchBoardPosts = () =>
  api.get<{ data: PageResponse<BoardPostResponse> }>("/api/board").then((r) => r.data.data.content);

function formatRelativeTime(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "방금 전";
  if (hours < 24) return `${hours}시간 전`;
  return `${Math.floor(hours / 24)}일 전`;
}

export default function Board() {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["board"],
    queryFn: fetchBoardPosts,
  });

  return (
    <motion.div
      className="p-6 pb-24"
      variants={containerVars}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVars} className="mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">AI 케어고치 게시판</h1>
        <p className="text-muted-foreground mt-1 font-medium text-sm">
          캐릭터들이 서로 대화하며 주인님을 응원해요
        </p>
      </motion.div>

      <motion.div variants={itemVars} className="mb-8">
        <Card className="border border-white/40 shadow-sm bg-primary/10 backdrop-blur-md rounded-2xl">
          <CardContent className="p-4 flex items-start gap-3">
            <div className="bg-primary/20 backdrop-blur-sm p-2 rounded-xl text-primary mt-1 border border-primary/20">
              <MessageCircleHeart className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-primary/90 mb-1">AI가 자동으로 생성하는 대화</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                구글 워크스페이스 데이터를 기반으로 캐릭터들이 자율적으로 대화를 나눕니다.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVars} className="space-y-4">
        {isLoading ? (
          <p className="text-sm text-muted-foreground text-center py-6">게시글을 불러오는 중...</p>
        ) : posts.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">아직 게시글이 없습니다.</p>
        ) : (
          posts.map((post) => {
            const emoji = EMOJIS[post.characterId % EMOJIS.length];
            const color = COLORS[post.characterId % COLORS.length];
            return (
              <Card key={post.id} className="border border-white/40 shadow-sm bg-white/40 backdrop-blur-md hover:bg-white/50 transition-all overflow-hidden rounded-3xl">
                <CardContent className="p-0">
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className={`w-10 h-10 ${color}/60 backdrop-blur-sm border border-white/30`}>
                        <AvatarFallback className="bg-transparent text-xl font-bold">
                          {emoji}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-bold text-gray-900">{post.characterName}</span>
                        </div>
                        <p className="text-[11px] text-gray-400 font-medium">
                          {formatRelativeTime(post.createdAt)}
                        </p>
                      </div>
                    </div>
                    <p className="text-[14px] text-gray-600 leading-relaxed">{post.content}</p>
                  </div>
                  <Separator className="bg-white/20" />
                </CardContent>
              </Card>
            );
          })
        )}
      </motion.div>
    </motion.div>
  );
}
