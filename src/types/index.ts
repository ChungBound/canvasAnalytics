export interface DiscussionItem {
  id: string;
  title: string;
  content: string;
  author: string;
  authorEmail: string;
  createdAt: string;
  updatedAt: string;
  priority: 'low' | 'medium' | 'high';
  type: 'lecture' | 'workshop' | 'assignment';
  sentiment: 'ACADEMIC_DESPERATION' | 'PRODUCTIVE_STRUGGLE' | 'CONFUSION' | 'TECHNOSTRESS' | 'BOREDOM' | 'HOSTILITY' | 'EPISTEMIC_CURIOSITY';
  level: 'topic' | 'post' | 'reply';
  parentId?: string;
  parentTitle?: string;
  link: string;
  replyCount: number;
  suggestedReply?: string;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface DashboardStats {
  totalTopics: number;
  totalPosts: number;
  totalReplies: number;
}

export interface ChartData {
  priorityData: Array<{ value: number; name: string }>;
  typeData: Array<{ value: number; name: string }>;
  sentimentData: Array<{ value: number; name: string; color: string }>;
}

export interface FilterOptions {
  priority?: 'low' | 'medium' | 'high';
  type?: 'lecture' | 'workshop' | 'assignment';
  sentiment?: 'ACADEMIC_DESPERATION' | 'PRODUCTIVE_STRUGGLE' | 'CONFUSION' | 'TECHNOSTRESS' | 'BOREDOM' | 'HOSTILITY' | 'EPISTEMIC_CURIOSITY';
  level?: 'topic' | 'post' | 'reply';
  author?: string;
  id?: string;
  startDate?: string;
  endDate?: string;
}

export interface SortOptions {
  field: 'createdAt' | 'replyCount';
  order: 'asc' | 'desc';
}

export interface LoginAccount {
  id: string;
  username: string;
  password: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface EmailNotification {
  id: string;
  loginAccountId: string;
  email: string;
  enabled: boolean;
  createdAt: string;
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
}
