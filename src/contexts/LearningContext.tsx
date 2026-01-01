import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  category: string;
  progress: number;
  isCompleted: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: Date;
  isUnlocked: boolean;
}

interface Badge {
  id: string;
  title: string;
  icon: string;
  color: string;
  isEarned: boolean;
}

interface UserProgress {
  xp: number;
  level: number;
  streak: number;
  lessonsCompleted: number;
  totalLessons: number;
  weeklyGoal: number;
  weeklyProgress: number;
}

interface LearningContextType {
  lessons: Lesson[];
  achievements: Achievement[];
  badges: Badge[];
  userProgress: UserProgress;
  currentLesson: Lesson | null;
  setCurrentLesson: (lesson: Lesson | null) => void;
  updateLessonProgress: (lessonId: string, progress: number) => void;
  addXp: (amount: number) => void;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

// Mock Data
const mockLessons: Lesson[] = [
  {
    id: '1',
    title: 'Introduction to Machine Learning',
    description: 'Learn the fundamentals of ML and how algorithms learn from data.',
    duration: '15:30',
    thumbnail: '',
    videoUrl: 'https://www.youtube.com/embed/ukzFI9rgwfU',
    category: 'AI & ML',
    progress: 75,
    isCompleted: false,
  },
  {
    id: '2',
    title: 'Neural Networks Deep Dive',
    description: 'Understanding how neural networks process and learn information.',
    duration: '22:45',
    thumbnail: '',
    videoUrl: 'https://www.youtube.com/embed/aircAruvnKk',
    category: 'AI & ML',
    progress: 0,
    isCompleted: false,
  },
  {
    id: '3',
    title: 'Data Structures Essentials',
    description: 'Master arrays, linked lists, trees, and graphs.',
    duration: '18:20',
    thumbnail: '',
    videoUrl: 'https://www.youtube.com/embed/RBSGKlAvoiM',
    category: 'Programming',
    progress: 100,
    isCompleted: true,
  },
  {
    id: '4',
    title: 'React Hooks Mastery',
    description: 'Advanced patterns with useState, useEffect, and custom hooks.',
    duration: '25:00',
    thumbnail: '',
    videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q',
    category: 'Web Development',
    progress: 30,
    isCompleted: false,
  },
  {
    id: '5',
    title: 'Python for Data Science',
    description: 'Data manipulation and visualization with Python.',
    duration: '20:15',
    thumbnail: '',
    videoUrl: 'https://www.youtube.com/embed/LHBE6Q9XlzI',
    category: 'Data Science',
    progress: 0,
    isCompleted: false,
  },
];

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎯',
    rarity: 'common',
    isUnlocked: true,
    unlockedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'Week Warrior',
    description: 'Maintain a 7-day learning streak',
    icon: '🔥',
    rarity: 'rare',
    isUnlocked: true,
    unlockedAt: new Date('2024-01-20'),
  },
  {
    id: '3',
    title: 'Knowledge Seeker',
    description: 'Complete 10 lessons',
    icon: '📚',
    rarity: 'rare',
    isUnlocked: false,
  },
  {
    id: '4',
    title: 'AI Pioneer',
    description: 'Complete all AI & ML courses',
    icon: '🤖',
    rarity: 'epic',
    isUnlocked: false,
  },
  {
    id: '5',
    title: 'Coding Legend',
    description: 'Reach Level 50',
    icon: '👑',
    rarity: 'legendary',
    isUnlocked: false,
  },
];

const mockBadges: Badge[] = [
  { id: '1', title: 'Quick Learner', icon: '⚡', color: 'primary', isEarned: true },
  { id: '2', title: 'Night Owl', icon: '🦉', color: 'accent', isEarned: true },
  { id: '3', title: 'Perfectionist', icon: '💎', color: 'secondary', isEarned: false },
  { id: '4', title: 'Team Player', icon: '🤝', color: 'success', isEarned: false },
  { id: '5', title: 'Explorer', icon: '🧭', color: 'lesson', isEarned: true },
];

const initialProgress: UserProgress = {
  xp: 2450,
  level: 12,
  streak: 7,
  lessonsCompleted: 8,
  totalLessons: 25,
  weeklyGoal: 5,
  weeklyProgress: 3,
};

export function LearningProvider({ children }: { children: ReactNode }) {
  const [lessons, setLessons] = useState<Lesson[]>(mockLessons);
  const [achievements] = useState<Achievement[]>(mockAchievements);
  const [badges] = useState<Badge[]>(mockBadges);
  const [userProgress, setUserProgress] = useState<UserProgress>(initialProgress);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);

  const updateLessonProgress = (lessonId: string, progress: number) => {
    setLessons(prev =>
      prev.map(lesson =>
        lesson.id === lessonId
          ? { ...lesson, progress, isCompleted: progress >= 100 }
          : lesson
      )
    );
  };

  const addXp = (amount: number) => {
    setUserProgress(prev => {
      const newXp = prev.xp + amount;
      const xpPerLevel = 500;
      const newLevel = Math.floor(newXp / xpPerLevel) + 1;
      return { ...prev, xp: newXp, level: newLevel };
    });
  };

  return (
    <LearningContext.Provider
      value={{
        lessons,
        achievements,
        badges,
        userProgress,
        currentLesson,
        setCurrentLesson,
        updateLessonProgress,
        addXp,
      }}
    >
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning() {
  const context = useContext(LearningContext);
  if (context === undefined) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
}
