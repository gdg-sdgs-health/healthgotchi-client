import { Home, ListChecks, MessageSquare, User } from "lucide-react";

export const MOCK_USER = {
  name: "김건강",
  email: "kimhealth@gmail.com",
  joinedAt: "2024년 1월",
  pet: {
    name: "삐약이",
    level: 8,
    xp: 65,
    streak: 7,
  },
  stats: {
    health: 85,
    energy: 72,
    mood: 90,
  }
};

export const RECENT_ACTIVITY = [
  { id: 1, title: "조깅 30분 완료", time: "2시간 전", status: "완료", icon: "activity", color: "bg-blue-100 text-blue-600" },
  { id: 2, title: "혈압약 복용", time: "5시간 전", status: "완료", icon: "pill", color: "bg-red-100 text-red-600" },
  { id: 3, title: "수면 8시간 달성", time: "8시간 전", status: "완료", icon: "moon", color: "bg-indigo-100 text-indigo-600" },
];

export const MISSIONS = [
  {
    id: 1,
    title: "고혈압 약 복용",
    description: "아침 8시 - 처방전에서 자동 생성됨",
    time: "08:00",
    source: "Gmail",
    streak: 7,
    completed: true,
    category: "medication",
  },
  {
    id: 2,
    title: "조깅 30분",
    description: "구글 캘린더 일정",
    time: "18:00",
    source: "Calendar",
    streak: 3,
    completed: true,
    category: "exercise",
  },
  {
    id: 3,
    title: "과일 섭취",
    description: "식단 기록 시트",
    time: "13:00",
    source: "Sheets",
    streak: 0,
    completed: false,
    category: "food",
  },
  {
    id: 4,
    title: "저녁 약 복용",
    description: "저녁 8시 - 처방전에서 자동 생성됨",
    time: "20:00",
    source: "Gmail",
    streak: 7,
    completed: false,
    category: "medication",
  },
  {
    id: 5,
    title: "명상 10분",
    description: "구글 캘린더 일정",
    time: "22:00",
    source: "Calendar",
    streak: 1,
    completed: false,
    category: "mindfulness",
  }
];

export const BOARD_POSTS = [
  {
    id: 1,
    petName: "헬시",
    ownerName: "김건강의 펫",
    time: "1시간 전",
    title: "주인님 혈압약 7일 연속 복용 성공! 🎉",
    content: "Gmail에서 처방전 기록을 확인해보니, 우리 주인님이 벌써 일주일째 약을 꼬박꼬박 챙겨 먹었어! 너무 기특하지 않아? 나도 쑥쑥 크는 기분이야!",
    emoji: "🐣",
    color: "bg-yellow-100"
  },
  {
    id: 2,
    petName: "튼튼이",
    ownerName: "박운동의 펫",
    time: "3시간 전",
    title: "우리 주인님 또 운동 안 갔어...",
    content: "구글 캘린더에 '저녁 수영'이라고 적어놓고 벌써 3일째 안 가고 있어. 내 근육 수치도 자꾸 떨어지려고 해. 누가 좀 말려줘 ㅠㅠ",
    emoji: "🐻",
    color: "bg-blue-100"
  },
  {
    id: 3,
    petName: "쑥쑥이",
    ownerName: "이식단의 펫",
    time: "5시간 전",
    title: "야채 섭취량 최고 기록 달성!",
    content: "주인님이 스프레드시트에 기록한 걸 보니까 이번 주 샐러드 섭취량이 목표치를 넘었어! 덕분에 내 깃털이 완전 윤기가 좔좔 흘러~ ✨",
    emoji: "🐰",
    color: "bg-green-100"
  }
];
