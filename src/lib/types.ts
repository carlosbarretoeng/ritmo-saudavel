import type { LucideIcon } from 'lucide-react';

export type User = {
  id: string;
  name: string;
  avatarUrl: string;
};

export type Habit = {
  id: string;
  name: string;
  icon: string; // Corresponds to a lucide-react icon name
  frequency: 'daily' | 'weekly';
  completedToday: boolean;
};

export type GroupObjective = {
  title: string;
  target: number;
  current: number;
  unit: string;
};

export type Group = {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  iconUrl: string;
  objective?: GroupObjective;
  commonHabits?: string[];
};

export type GroupMember = {
    user: User;
    points: number;
    rank: number;
}

export type GroupWithMembers = Group & {
    members: GroupMember[];
}

export type AppUser = User & {
  email: string;
  points: number;
  currentStreak: number;
  longestStreak: number;
  achievements: string[];
  habits: string[]; // array of habit ids
  groups: string[]; // array of group ids
};

export type ChatMessage = {
    id: string;
    userId: string;
    userName: string;
    userAvatarUrl: string;
    text: string;
    timestamp: Date;
};

export type Activity = {
    id: string;
    user: User;
    text: string;
    timestamp: Date;
    imageUrl?: string;
    imageHint?: string;
    habitName?: string;
    likes: number;
    comments: number;
    checkinValue?: number;
    checkinUnit?: string;
};

export type HabitIdea = Pick<Habit, 'name' | 'icon'>;
