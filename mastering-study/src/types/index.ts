import type { LucideIcon } from "lucide-react";

export interface NavItem {
  id: string;
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  isAiAction?: boolean;
}

export interface SubjectTrack {
  id: string;
  name: string;
  description: string;
  modulesCount: number;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  cardBorderHover: string;
}

export interface CurrentLesson {
  discipline: string;
  title: string;
  description: string;
  progressPercent: number;
  estimatedRemainingTime: string;
  moduleInfo: string;
}

export interface ByokConfig {
  provider: string;
  apiKey: string;
  isConnected: boolean;
}
