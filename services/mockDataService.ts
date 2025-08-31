
import { User, UserRole, Student, StudyMaterial } from '../types';

export const MOCK_USERS: Record<UserRole, User> = {
  [UserRole.STUDENT]: { id: 'student1', name: 'Alex Doe', role: UserRole.STUDENT },
  [UserRole.TEACHER]: { id: 'teacher1', name: 'Dr. Evelyn Reed', role: UserRole.TEACHER },
  [UserRole.PARENT]: { id: 'parent1', name: 'John Doe', role: UserRole.PARENT, childId: 'student1' },
  [UserRole.ADMIN]: { id: 'admin1', name: 'Principal Skinner', role: UserRole.ADMIN },
};

export const MOCK_STUDENTS: Student[] = [
  {
    id: 'student1',
    name: 'Alex Doe',
    performance: [
      { date: 'Mon', score: 75, focusTime: 45, engagement: 80 },
      { date: 'Tue', score: 80, focusTime: 55, engagement: 85 },
      { date: 'Wed', score: 78, focusTime: 50, engagement: 82 },
      { date: 'Thu', score: 85, focusTime: 60, engagement: 90 },
      { date: 'Fri', score: 90, focusTime: 65, engagement: 92 },
    ],
    sentiments: [
        { name: 'Focused', value: 60 },
        { name: 'Engaged', value: 25 },
        { name: 'Neutral', value: 10 },
        { name: 'Distracted', value: 5 },
    ],
    fees: { total: 5000, paid: 2500 },
    progress: 68,
    messages: ["Great work on the last assignment! Keep it up.", "Remember the deadline for the history project is this Friday."],
  },
  {
    id: 'student2',
    name: 'Jane Smith',
    performance: [
      { date: 'Mon', score: 88, focusTime: 60, engagement: 90 },
      { date: 'Tue', score: 92, focusTime: 65, engagement: 95 },
      { date: 'Wed', score: 85, focusTime: 58, engagement: 88 },
      { date: 'Thu', score: 95, focusTime: 70, engagement: 98 },
      { date: 'Fri', score: 91, focusTime: 68, engagement: 96 },
    ],
    sentiments: [
        { name: 'Focused', value: 75 },
        { name: 'Engaged', value: 20 },
        { name: 'Neutral', value: 5 },
        { name: 'Distracted', value: 0 },
    ],
    fees: { total: 5000, paid: 5000 },
    progress: 85,
    messages: ["Excellent participation in class discussions this week."],
  },
   {
    id: 'student3',
    name: 'Peter Jones',
    performance: [
      { date: 'Mon', score: 60, focusTime: 30, engagement: 65 },
      { date: 'Tue', score: 65, focusTime: 35, engagement: 70 },
      { date: 'Wed', score: 62, focusTime: 32, engagement: 68 },
      { date: 'Thu', score: 70, focusTime: 40, engagement: 75 },
      { date: 'Fri', score: 72, focusTime: 45, engagement: 78 },
    ],
    sentiments: [
        { name: 'Focused', value: 40 },
        { name: 'Engaged', value: 20 },
        { name: 'Neutral', value: 25 },
        { name: 'Distracted', value: 15 },
    ],
    fees: { total: 5000, paid: 1000 },
    progress: 45,
    messages: ["Let's work on improving focus during lectures. See me after class for some tips."],
  },
];

export const MOCK_CLASS_AVERAGE = {
    performance: [
      { date: 'Mon', score: 74, focusTime: 45, engagement: 78 },
      { date: 'Tue', score: 79, focusTime: 52, engagement: 83 },
      { date: 'Wed', score: 75, focusTime: 47, engagement: 79 },
      { date: 'Thu', score: 83, focusTime: 57, engagement: 88 },
      { date: 'Fri', score: 84, focusTime: 59, engagement: 89 },
    ],
};

export const MOCK_STUDY_MATERIALS: StudyMaterial[] = [
    { id: 'math101', type: 'video', title: 'Introduction to Algebra', url: 'https://www.youtube.com/embed/grnP3mduZkM', content: 'Algebra is a branch of mathematics that substitutes letters for numbers. An algebraic equation represents a scale, what is done on one side of the scale with a number is also done to the other side of the scale. The numbers are the constants. The letters are the variables.' },
    { id: 'history201', type: 'pdf', title: 'The Roman Empire', url: '/sample.pdf', content: 'The Roman Empire was one of the most powerful empires in world history. It was founded in 27 BC and survived for over 1000 years. Its legacy includes language, law, architecture, and government.' },
    { id: 'science301', type: 'animation', title: 'The Water Cycle', url: 'https://picsum.photos/536/354', content: 'The water cycle shows the continuous movement of water within the Earth and atmosphere. It is a complex system that includes many different processes. Liquid water evaporates into water vapor, condenses to form clouds, and precipitates back to Earth in the form of rain and snow.' },
];
