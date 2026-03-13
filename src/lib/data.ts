import type { User, Habit, Group, AppUser, GroupWithMembers, ChatMessage, Activity, HabitIdea, GroupObjective, Comment, UserHabitConfig } from './types';
import { placeholderImages as allPlaceholderImages } from './placeholder-images';

export const placeholderImages = allPlaceholderImages;

export const users: User[] = [
  { id: 'user-1', name: 'Ana Silva', avatarUrl: placeholderImages.find(p => p.id === 'avatar-1')?.imageUrl || '', birthdate: '1990-05-15' },
  { id: 'user-2', name: 'Bruno Costa', avatarUrl: placeholderImages.find(p => p.id === 'avatar-2')?.imageUrl || '', birthdate: '1988-11-23' },
  { id: 'user-3', name: 'Carla Dias', avatarUrl: placeholderImages.find(p => p.id === 'avatar-3')?.imageUrl || '', birthdate: '1995-02-10' },
  { id: 'user-4', name: 'Daniel Alves', avatarUrl: placeholderImages.find(p => p.id === 'avatar-4')?.imageUrl || '', birthdate: '1992-09-01' },
  { id: 'user-5', name: 'Você', avatarUrl: placeholderImages.find(p => p.id === 'avatar-1')?.imageUrl || '', birthdate: '1994-08-22' },
  { id: 'user-6', name: 'Eduarda Lima', avatarUrl: placeholderImages.find(p => p.id === 'avatar-5')?.imageUrl || '', birthdate: '1998-03-30' },
  { id: 'user-7', name: 'Fábio Melo', avatarUrl: placeholderImages.find(p => p.id === 'avatar-6')?.imageUrl || '', birthdate: '1985-12-05' },
];

export const mainUser: AppUser = {
  id: 'user-5',
  name: 'Alex',
  email: 'alex@example.com',
  points: 1250,
  currentStreak: 12,
  longestStreak: 25,
  achievements: ['Iniciante', '5 Dias de Foco', 'Primeiro Grupo'],
  groups: ['group-1', 'group-2'],
  avatarUrl: placeholderImages.find(p => p.id === 'avatar-2')?.imageUrl || '',
  birthdate: '1994-08-22',
};

export const systemHabits: Habit[] = [
  { id: 'habit-1', name: 'Beber Água', icon: 'GlassWater', type: 'metric', category: 'Saúde', unit: 'L', information: 'A recomendação geral é de 2 litros por dia, mas pode variar. (fonte: https://bit.ly/agua-info)' },
  { id: 'habit-2', name: 'Correr', icon: 'Flame', type: 'metric', category: 'Fitness', unit: 'min', information: 'A OMS indica 40 minutos de exercícios físicos por semana. (fonte: https://bit.ly/oms-exercicios)' },
  { id: 'habit-3', name: 'Ler', icon: 'Book', type: 'metric', category: 'Desenvolvimento', unit: 'pág' },
  { id: 'habit-4', name: 'Meditar', icon: 'HeartPulse', type: 'boolean', category: 'Bem-estar', information: 'Meditar por 10 minutos pode melhorar o foco e reduzir o estresse. (fonte: https://bit.ly/meditacao-beneficios)' },
  { id: 'habit-5', name: 'Acordar Cedo', icon: 'Sunrise', type: 'boolean', category: 'Produtividade' },
  { id: 'habit-6', name: 'Alongar', icon: 'Sprout', type: 'boolean', category: 'Fitness' },
];

export const userHabitConfigs: UserHabitConfig[] = [
    { habitId: 'habit-1', isEnabled: true, goal: 2.5 },
    { habitId: 'habit-2', isEnabled: true, goal: 45 },
    { habitId: 'habit-3', isEnabled: true, goal: 20 },
    { habitId: 'habit-4', isEnabled: true, goal: 1 },
    { habitId: 'habit-5', isEnabled: false, goal: 1 },
    { habitId: 'habit-6', isEnabled: true, goal: 1 },
]

export const activityFeed: Activity[] = [
    {
        id: 'act-1',
        user: users[0],
        habitId: 'habit-2',
        habitName: 'Correr',
        text: 'Mantendo o foco no desafio da semana! 🏃‍♀️ #corrida #saude',
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        imageUrl: placeholderImages.find(p => p.id === 'activity-1')?.imageUrl || '',
        imageHint: placeholderImages.find(p => p.id === 'activity-1')?.imageHint || '',
        likes: 23,
        comments: [
            { id: 'comment-1-1', user: users[1], text: 'Boa, Ana! Continue assim!' },
            { id: 'comment-1-2', user: users[3], text: 'Arrasou! 🔥' },
        ],
        checkinValue: 30,
        checkinUnit: 'min',
    },
    {
        id: 'act-4',
        user: mainUser,
        habitId: 'habit-1',
        habitName: 'Beber Água',
        text: 'Check-in de hoje feito! Mantendo a hidratação.',
        timestamp: new Date(),
        imageUrl: "https://picsum.photos/seed/activity4/600/800",
        imageHint: "water bottle",
        likes: 5,
        comments: [],
        checkinValue: 1,
        checkinUnit: 'L',
    },
    {
        id: 'act-2',
        user: users[2],
        habitId: 'habit-4',
        habitName: 'Meditar',
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
        habitId: 'habit-3',
        habitName: 'Ler',
        text: 'Terminei mais um capítulo incrível! Recomendo muito esse livro.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
        imageUrl: placeholderImages.find(p => p.id === 'activity-3')?.imageUrl || '',
        imageHint: placeholderImages.find(p => p.id === 'activity-3')?.imageHint || '',
        likes: 15,
        comments: [
            { id: 'comment-3-1', user: users[2], text: 'Qual o nome do livro?' },
        ],
        checkinValue: 25,
        checkinUnit: 'pág'
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
