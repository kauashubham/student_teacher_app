
export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  PARENT = 'PARENT',
  ADMIN = 'ADMIN',
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  childId?: string; 
}

export interface PerformanceData {
  date: string;
  score: number;
  focusTime: number; // in minutes
  engagement: number; // percentage
}

export interface SentimentData {
    name: string;
    value: number;
}

export interface Student {
  id: string;
  name:string;
  performance: PerformanceData[];
  sentiments: SentimentData[];
  fees: {
    total: number;
    paid: number;
  };
  progress: number; // percentage
  messages: string[];
}

export interface StudyMaterial {
    id: string;
    type: 'video' | 'pdf' | 'animation';
    title: string;
    url: string;
    content?: string; // for text-based materials for quiz generation
}

export interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: string;
}
