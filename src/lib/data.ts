import type { User, Habit, Group, AppUser, GroupWithMembers, ChatMessage, Activity, HabitIdea, GroupObjective, Comment } from './types';
import { placeholderImages as allPlaceholderImages } from './placeholder-images';

export const placeholderImages = allPlaceholderImages;

export const users: User[] = [
  { id: 'user-1', name: 'Ana Silva', avatarUrl: placeholderImages.find(p => p.id === 'avatar-1')?.imageUrl || '' },
  { id: 'user-2', name: 'Bruno Costa', avatarUrl: placeholderImages.find(p => p.id === 'avatar-2')?.imageUrl || '' },
  { id: 'user-3', name: 'Carla Dias', avatarUrl: placeholderImages.find(p => p.id === 'avatar-3')?.imageUrl || '' },
  { id: 'user-4', name: 'Daniel Alves', avatarUrl: placeholderImages.find(p => p.id === 'avatar-4')?.imageUrl || '' },
  { id: 'user-5', name: 'Você', avatarUrl: placeholderImages.find(p => p.id === 'avatar-1')?.imageUrl || '' },
  { id: 'user-6', name: 'Eduarda Lima', avatarUrl: placeholderImages.find(p => p.id === 'avatar-5')?.imageUrl || '' },
  { id: 'user-7', name: 'Fábio Melo', avatarUrl: placeholderImages.find(p => p.id === 'avatar-6')?.imageUrl || '' },
];

export const mainUser: AppUser = {
  id: 'user-5',
  name: 'Alex',
  email: 'alex@example.com',
  points: 1250,
  currentStreak: 12,
  longestStreak: 25,
  achievements: ['Iniciante', '5 Dias de Foco', 'Primeiro Grupo'],
  habits: ['habit-1', 'habit-2', 'habit-3', 'habit-4'],
  groups: ['group-1', 'group-2'],
  avatarUrl: placeholderImages.find(p => p.id === 'avatar-2')?.imageUrl || '',
};


export const habits: Habit[] = [
  { id: 'habit-1', name: 'Beber 2L de água', icon: 'GlassWater', frequency: 'daily', completedToday: true },
  { id: 'habit-2', name: 'Correr 30 minutos', icon: 'Flame', frequency: 'daily', completedToday: false },
  { id: 'habit-3', name: 'Ler 10 páginas', icon: 'Book', frequency: 'daily', completedToday: false },
  { id: 'habit-4', name: 'Meditar 5 minutos', icon: 'HeartPulse', frequency: 'daily', completedToday: true },
  { id: 'habit-5', name: 'Acordar cedo', icon: 'Sunrise', frequency: 'daily', completedToday: false },
  { id: 'habit-6', name: 'Alongar', icon: 'Sprout', frequency: 'daily', completedToday: false },

];

export const activityFeed: Activity[] = [
    {
        id: 'act-1',
        user: users[0],
        habitName: 'Correr 30 minutos',
        text: 'Mantendo o foco no desafio da semana! 🏃‍♀️ #corrida #saude',
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        imageUrl: placeholderImages.find(p => p.id === 'activity-1')?.imageUrl || '',
        imageHint: placeholderImages.find(p => p.id === 'activity-1')?.imageHint || '',
        likes: 23,
        comments: [
            { id: 'comment-1-1', user: users[1], text: 'Boa, Ana! Continue assim!' },
            { id: 'comment-1-2', user: users[3], text: 'Arrasou! 🔥' },
        ],
    },
    {
        id: 'act-2',
        user: users[2],
        habitName: 'Meditar 5 minutos',
        text: 'Um momento de paz para começar o dia.',
        timestamp: new Date(Date.now() - 1000 * 60 * 58),
        imageUrl: placeholderImages.find(p => p.id === 'activity-2')?.imageUrl || '',
        imageHint: placeholderImages.find(p => p.id === 'activity-2')?.imageHint || '',
        likes: 42,
        comments: [
            { id: 'comment-2-1', user: users[0], text: 'Que foto linda!' },
            { id: 'comment-2-2', user: users[3], text: 'Preciso fazer isso também.' },
            { id: 'comment-2-3', user: mainUser, text: 'Adorei!' },
        ],
    },
    {
        id: 'act-3',
        user: users[1],
        habitName: 'Ler 10 páginas',
        text: 'Terminei mais um capítulo incrível! Recomendo muito esse livro.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
        imageUrl: placeholderImages.find(p => p.id === 'activity-3')?.imageUrl || '',
        imageHint: placeholderImages.find(p => p.id === 'activity-3')?.imageHint || '',
        likes: 15,
        comments: [
            { id: 'comment-3-1', user: users[2], text: 'Qual o nome do livro?' },
        ],
    },
];

export const groups: Group[] = [
  { id: 'group-1', name: 'Foco na Trilha', description: 'Amantes de corrida e caminhada.', memberCount: 12, iconUrl: placeholderImages.find(p => p.id === 'group-logo-1')?.imageUrl || '', objective: { title: 'Meta Mensal de Corrida', target: 100, current: 45, unit: 'km' }, commonHabits: ['habit-2'] },
  { id: 'group-2', name: 'Guerreiros da Academia', description: 'Desafios de musculação e cardio.', memberCount: 8, iconUrl: placeholderImages.find(p => p.id === 'group-logo-2')?.imageUrl || '', objective: { title: 'Meta de Treinos Mensal', target: 20, current: 12, unit: 'treinos' }, commonHabits: ['habit-2', 'habit-6'] },
  { id: 'group-3', name: 'Hidratação é Vida', description: 'Grupo para lembrar de beber água.', memberCount: 25, iconUrl: placeholderImages.find(p => p.id === 'group-logo-3')?.imageUrl || '', objective: { title: 'Meta de Hidratação', target: 60, current: 50, unit: 'litros' }, commonHabits: ['habit-1'] },
];

export const groupDetails: GroupWithMembers[] = [
    {
        ...groups[0],
        members: [
            { user: users[4], points: 2300, rank: 1 },
            { user: users[1], points: 2150, rank: 2 },
            { user: users[2], points: 1980, rank: 3 },
            { user: users[0], points: 1800, rank: 4 },
        ]
    }
]

export const groupChatMessages: ChatMessage[] = [
    { id: 'msg-1', userId: 'user-1', userName: users[0].name, userAvatarUrl: users[0].avatarUrl, text: 'E aí pessoal, todos prontos para o desafio da semana?', timestamp: new Date(Date.now() - 1000 * 60 * 50) },
    { id: 'msg-2', userId: 'user-2', userName: users[1].name, userAvatarUrl: users[1].avatarUrl, text: 'Com certeza! Já corri meus 5km hoje.', timestamp: new Date(Date.now() - 1000 * 60 * 45) },
    { id: 'msg-3', userId: 'user-5', userName: 'Você', userAvatarUrl: mainUser.avatarUrl, text: 'Boa! Eu vou mais tarde. Alguém tem dica de playlist?', timestamp: new Date(Date.now() - 1000 * 60 * 30) },
    { id: 'msg-4', userId: 'user-1', userName: users[0].name, userAvatarUrl: users[0].avatarUrl, text: 'Acabei de compartilhar uma ótima no nosso feed!', timestamp: new Date(Date.now() - 1000 * 60 * 20) },
]
