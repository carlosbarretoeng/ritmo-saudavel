import type { LucideIcon } from 'lucide-react';

export type User = {
  id: string;
  name: string;
  avatarUrl: string;
  birthdate?: string;
};

export type Habit = {
  id: string;
  name: string;
  icon: string; // Corresponds to a lucide-react icon name
  type: 'metric' | 'boolean';
  category: string;
  unit?: string;
  information?: string;
};

export type UserHabitConfig = {
  habitId: string;
  isEnabled: boolean;
  goal: number;
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
  groups: string[]; // array of group ids
  birthdate: string;
};

export type ChatMessage = {
    id: string;
    userId: string;
    userName: string;
    userAvatarUrl: string;
    text: string;
    timestamp: Date;
};

export type Comment = {
  id: string;
  user: User;
  text: string;
};

export type Activity = {
    id: string;
    user: User;
    text: string;
    timestamp: Date;
    imageUrl?: string;
    imageHint?: string;
    habitId: string;
    habitName?: string;
    likes: number;
    comments: Comment[];
    checkinValue?: number;
    checkinUnit?: string;
};

export type HabitIdea = Pick<Habit, 'name' | 'icon'>;
