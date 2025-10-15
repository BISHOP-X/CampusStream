// Mock data for the campus news system

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'lecturer' | 'admin';
  department: string;
  level?: string;
  avatar?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Academic' | 'Event' | 'Sport' | 'Student Affairs' | 'Urgent' | 'General' | 'Administrative';
  department: string;
  author: User;
  publishedAt: Date;
  priority: 'normal' | 'high' | 'urgent';
  isBookmarked?: boolean;
  imageUrl?: string;
}

export interface Notification {
  id: string;
  type: 'news' | 'event' | 'urgent' | 'system';
  message: string;
  timestamp: Date;
  isRead: boolean;
  relatedNewsId?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  color: string;
}

export interface Department {
  id: string;
  name: string;
  color: string;
  newsCount: number;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@campus.edu',
    role: 'lecturer',
    department: 'Computer Science',
    avatar: '👩‍🏫',
  },
  {
    id: '2',
    name: 'Prof. Michael Chen',
    email: 'michael.chen@campus.edu',
    role: 'lecturer',
    department: 'Engineering',
    avatar: '👨‍🏫',
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    email: 'emily.rodriguez@campus.edu',
    role: 'lecturer',
    department: 'Business',
    avatar: '👩‍💼',
  },
  {
    id: '4',
    name: 'Campus Admin',
    email: 'admin@campus.edu',
    role: 'admin',
    department: 'Administration',
    avatar: '👨‍💻',
  },
];

export const currentUser: User = {
  id: '5',
  name: 'Alex Thompson',
  email: 'alex.thompson@student.campus.edu',
  role: 'student',
  department: 'Computer Science',
  level: '300 Level',
  avatar: '👨‍🎓',
};

// Mock News Items
export const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Final Examination Timetable Released',
    excerpt: 'The examination timetable for the 2024/2025 academic session has been published. Students are advised to check their exam schedules.',
    content: `The examination timetable for the 2024/2025 academic session has been officially released. All students are required to check their individual exam schedules on the student portal.\n\nKey Points:\n- Exams begin on January 15th, 2025\n- No exam clashes reported\n- Special arrangements available for students with disabilities\n- Contact the Exams Office for any queries\n\nPlease ensure you arrive at least 30 minutes before your scheduled exam time.`,
    category: 'Academic',
    department: 'All Departments',
    author: mockUsers[3],
    publishedAt: new Date('2024-12-20T10:30:00'),
    priority: 'urgent',
    isBookmarked: false,
  },
  {
    id: '2',
    title: 'Campus Tech Fest 2025 - Call for Participation',
    excerpt: 'Join us for the biggest technology event of the year! Showcase your projects, attend workshops, and network with industry professionals.',
    content: `We are excited to announce the Campus Tech Fest 2025, scheduled for February 10-12, 2025.\n\nEvent Highlights:\n- Project exhibitions from all departments\n- Industry expert keynotes\n- Hands-on workshops on AI, Web3, and Cloud Computing\n- Startup pitch competition with cash prizes\n- Networking sessions\n\nRegistration opens January 5th. Don't miss this opportunity to showcase your innovations!`,
    category: 'Event',
    department: 'Computer Science',
    author: mockUsers[0],
    publishedAt: new Date('2024-12-19T14:20:00'),
    priority: 'high',
    isBookmarked: true,
  },
  {
    id: '3',
    title: 'Library Extended Hours During Exam Period',
    excerpt: 'The university library will operate 24/7 starting next week to support students during the examination period.',
    content: `To support our students during the upcoming examination period, the main campus library will extend its operating hours.\n\nNew Schedule (Jan 8-31):\n- Open 24 hours, 7 days a week\n- All study rooms available for booking\n- Free coffee and snacks from 10 PM - 6 AM\n- Silent zones strictly enforced\n\nPlease bring your student ID for after-hours access.`,
    category: 'Student Affairs',
    department: 'All Departments',
    author: mockUsers[3],
    publishedAt: new Date('2024-12-18T09:15:00'),
    priority: 'normal',
    isBookmarked: false,
  },
  {
    id: '4',
    title: 'Inter-Departmental Football Championship',
    excerpt: 'The annual inter-departmental football tournament kicks off next month. Team registration is now open!',
    content: `Get ready for the most anticipated sporting event of the semester! The Inter-Departmental Football Championship returns.\n\nTournament Details:\n- Registration deadline: January 10th\n- Tournament dates: January 20-27\n- Venue: Main Sports Complex\n- Cash prizes for top 3 teams\n- Trophy for the winning department\n\nContact the Sports Council to register your team.`,
    category: 'Sport',
    department: 'All Departments',
    author: mockUsers[3],
    publishedAt: new Date('2024-12-17T16:45:00'),
    priority: 'normal',
    isBookmarked: false,
  },
  {
    id: '5',
    title: 'New Software Engineering Course Launch',
    excerpt: 'The Computer Science department is launching a new advanced course on Software Engineering best practices.',
    content: `We are pleased to announce the launch of a new elective course: Advanced Software Engineering (CSC 401).\n\nCourse Overview:\n- Instructor: Dr. Sarah Johnson\n- Credits: 3 units\n- Prerequisites: CSC 301, CSC 302\n- Topics: Design patterns, microservices, DevOps, testing strategies\n- Limited to 50 students\n\nRegistration opens on January 3rd on the student portal.`,
    category: 'Academic',
    department: 'Computer Science',
    author: mockUsers[0],
    publishedAt: new Date('2024-12-16T11:00:00'),
    priority: 'normal',
    isBookmarked: true,
  },
  {
    id: '6',
    title: 'Emergency: Campus Water Supply Interruption',
    excerpt: 'There will be a temporary water supply interruption tomorrow from 8 AM to 2 PM due to maintenance work.',
    content: `URGENT NOTICE\n\nDue to essential maintenance work on the main water pipeline, there will be a temporary interruption to water supply across campus.\n\nDetails:\n- Date: December 22, 2024\n- Time: 8:00 AM - 2:00 PM\n- Affected areas: All campus buildings\n- Water tankers will be stationed at strategic locations\n\nWe apologize for any inconvenience. Please plan accordingly.`,
    category: 'Urgent',
    department: 'All Departments',
    author: mockUsers[3],
    publishedAt: new Date('2024-12-21T07:00:00'),
    priority: 'urgent',
    isBookmarked: false,
  },
  {
    id: '7',
    title: 'Career Fair 2025 - Meet Top Employers',
    excerpt: 'Over 50 companies will be on campus for recruitment. Prepare your resumes and dress professionally!',
    content: `The annual Career Fair is back! This is your chance to meet potential employers and explore career opportunities.\n\nEvent Details:\n- Date: February 5-6, 2025\n- Time: 9 AM - 5 PM\n- Venue: University Auditorium\n- Participating companies: Tech giants, startups, consulting firms\n- Free CV review sessions\n- Mock interview workshops\n\nParticipating Companies Include:\n- Google, Microsoft, Amazon\n- Local tech startups\n- Banking and finance firms\n- NGOs and public sector organizations\n\nRegister early to secure your spot!`,
    category: 'Event',
    department: 'All Departments',
    author: mockUsers[3],
    publishedAt: new Date('2024-12-15T13:30:00'),
    priority: 'high',
    isBookmarked: false,
  },
  {
    id: '8',
    title: 'Engineering Design Competition Winners',
    excerpt: 'Congratulations to the winners of this year\'s Engineering Design Competition. Innovative solutions to real-world problems!',
    content: `We are proud to announce the winners of the 2024 Engineering Design Competition.\n\n1st Place: Solar-Powered Water Purification System\nTeam: Innovation Squad (Mechanical Engineering)\nPrize: $5,000\n\n2nd Place: Smart Traffic Management AI\nTeam: Code Crafters (Computer Engineering)\nPrize: $3,000\n\n3rd Place: Eco-Friendly Building Materials\nTeam: Green Engineers (Civil Engineering)\nPrize: $2,000\n\nThank you to all participants for your creativity and hard work!`,
    category: 'Academic',
    department: 'Engineering',
    author: mockUsers[1],
    publishedAt: new Date('2024-12-14T15:20:00'),
    priority: 'normal',
    isBookmarked: false,
  },
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'urgent',
    message: 'Emergency water supply interruption scheduled for tomorrow',
    timestamp: new Date('2024-12-21T07:05:00'),
    isRead: false,
    relatedNewsId: '6',
  },
  {
    id: '2',
    type: 'news',
    message: 'New announcement: Final Examination Timetable Released',
    timestamp: new Date('2024-12-20T10:35:00'),
    isRead: false,
    relatedNewsId: '1',
  },
  {
    id: '3',
    type: 'event',
    message: 'Campus Tech Fest 2025 registration opens in 2 weeks',
    timestamp: new Date('2024-12-19T14:25:00'),
    isRead: true,
    relatedNewsId: '2',
  },
  {
    id: '4',
    type: 'news',
    message: 'Library extended hours announced for exam period',
    timestamp: new Date('2024-12-18T09:20:00'),
    isRead: true,
    relatedNewsId: '3',
  },
  {
    id: '5',
    type: 'system',
    message: 'Your profile has been updated successfully',
    timestamp: new Date('2024-12-17T12:00:00'),
    isRead: true,
  },
];

// Mock Categories
export const mockCategories: Category[] = [
  { id: '1', name: 'Academic', icon: '📚', count: 12, color: 'bg-blue-500' },
  { id: '2', name: 'Events', icon: '🎉', count: 8, color: 'bg-purple-500' },
  { id: '3', name: 'Sports', icon: '⚽', count: 5, color: 'bg-green-500' },
  { id: '4', name: 'Student Affairs', icon: '👥', count: 7, color: 'bg-yellow-500' },
  { id: '5', name: 'Urgent', icon: '⚠️', count: 3, color: 'bg-red-500' },
  { id: '6', name: 'General', icon: '📢', count: 15, color: 'bg-gray-500' },
  { id: '7', name: 'Administrative', icon: '🏛️', count: 6, color: 'bg-indigo-500' },
];

// Mock Departments
export const mockDepartments: Department[] = [
  { id: '1', name: 'Computer Science', color: 'bg-primary', newsCount: 18 },
  { id: '2', name: 'Engineering', color: 'bg-secondary', newsCount: 14 },
  { id: '3', name: 'Medicine', color: 'bg-red-500', newsCount: 10 },
  { id: '4', name: 'Business', color: 'bg-green-500', newsCount: 12 },
  { id: '5', name: 'Arts', color: 'bg-purple-500', newsCount: 8 },
  { id: '6', name: 'Science', color: 'bg-blue-500', newsCount: 11 },
  { id: '7', name: 'All Departments', color: 'bg-gray-500', newsCount: 25 },
];
