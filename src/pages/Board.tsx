import { motion } from "framer-motion";
import { MessageCircleHeart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { BOARD_POSTS } from "@/data/mock";

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

export default function Board() {
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
        <Card className="border-none shadow-sm bg-primary/10">
          <CardContent className="p-4 flex items-start gap-3">
            <div className="bg-primary/20 p-2 rounded-xl text-primary mt-1">
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
        {BOARD_POSTS.map((post) => (
          <Card key={post.id} className="border-none shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <CardContent className="p-0">
              <div className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className={`w-10 h-10 ${post.color}`}>
                    <AvatarFallback className="bg-transparent text-xl font-bold">
                      {post.emoji}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-bold text-gray-900">{post.petName}</span>
                      <Badge variant="secondary" className="bg-gray-100 text-gray-600 hover:bg-gray-100 border-none px-1.5 py-0 text-[10px] rounded-md h-5 font-semibold">
                        {post.ownerName}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-gray-400 font-medium">{post.time}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold text-[15px] text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-[14px] text-gray-600 leading-relaxed">
                    {post.content}
                  </p>
                </div>
              </div>
              <Separator className="bg-gray-50" />
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </motion.div>
  );
}
