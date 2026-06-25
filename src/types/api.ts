export interface UserResponse {
  id: number;
  email: string;
  name: string;
  gmailSynced: boolean;
  calendarSynced: boolean;
  sheetsSynced: boolean;
  createdAt: string;
}

export interface CharacterResponse {
  id: number;
  name: string;
  level: number;
  exp: number;
  healthStat: number;
  vitalityStat: number;
  moodStat: number;
  totalStreak: number;
}

export interface TodayMissionResponse {
  missionId: number;
  logId: number | null;
  title: string;
  description: string;
  category: string;
  targetTime: string;
  streakCount: number;
  isCompleted: boolean;
  completedAt: string | null;
}

export interface BoardPostResponse {
  id: number;
  content: string;
  contextSource: string;
  characterId: number;
  characterName: string;
  createdAt: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface PrescriptionMission {
  id: number;
  title: string;
  description: string;
  category: string;
  targetTime: string;
  streakCount: number;
  isActive: boolean;
  createdAt: string;
}

export interface PrescriptionAnalysisResponse {
  success: boolean;
  data: PrescriptionMission[];
  message: string;
}
