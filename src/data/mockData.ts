import { DiscussionItem, Admin, DashboardStats, ChartData, LoginAccount, EmailNotification } from '@/types';

// Mock discussion data
export const mockDiscussionData: DiscussionItem[] = [
  {
    id: '1',
    title: 'Machine Learning Fundamentals Discussion',
    content: 'Please share your understanding of machine learning fundamentals, especially the differences between supervised and unsupervised learning.',
    author: 'Prof. Johnson',
    authorEmail: 'johnson.prof@university.edu',
    createdAt: '2024-09-20T10:30:00Z',
    updatedAt: '2024-09-20T10:30:00Z',
    priority: 'high',
    type: 'lecture',
    sentiment: 'EPISTEMIC_CURIOSITY',
    level: 'topic',
    link: 'https://canvas.university.edu/courses/123/discussion_topics/1',
    replyCount: 1,
    suggestedReply: 'This is an excellent question. I suggest approaching the difference from a data labeling perspective.'
  },
  {
    id: '2',
    title: 'Understanding Supervised Learning',
    content: 'I believe supervised learning refers to having labeled datasets that we can use to train models to predict new data.',
    author: 'Emma Chen',
    authorEmail: 'emma.chen@university.edu',
    createdAt: '2024-09-20T11:15:00Z',
    updatedAt: '2024-09-20T11:15:00Z',
    priority: 'medium',
    type: 'lecture',
    sentiment: 'EPISTEMIC_CURIOSITY',
    level: 'post',
    parentId: '1',
    parentTitle: 'Machine Learning Fundamentals Discussion',
    link: 'https://canvas.university.edu/courses/123/discussion_topics/1#entry-2',
    replyCount: 3,
    suggestedReply: 'Great understanding! You could further supplement with some specific algorithm examples.'
  },
  {
    id: '2-1',
    title: 'Re: Understanding Supervised Learning',
    content: 'That\'s correct! Supervised learning uses labeled data to train models. Common examples include classification and regression tasks.',
    author: 'Prof. Johnson',
    authorEmail: 'johnson.prof@university.edu',
    createdAt: '2024-09-20T11:30:00Z',
    updatedAt: '2024-09-20T11:30:00Z',
    priority: 'medium',
    type: 'lecture',
    sentiment: 'EPISTEMIC_CURIOSITY',
    level: 'reply',
    parentId: '2',
    parentTitle: 'Understanding Supervised Learning',
    link: 'https://canvas.university.edu/courses/123/discussion_topics/1#entry-2-1',
    replyCount: 0,
    suggestedReply: ''
  },
  {
    id: '2-2',
    title: 'Re: Understanding Supervised Learning',
    content: 'I agree! Could you provide some examples of supervised learning algorithms?',
    author: 'Tom Wilson',
    authorEmail: 'tom.wilson@university.edu',
    createdAt: '2024-09-20T12:00:00Z',
    updatedAt: '2024-09-20T12:00:00Z',
    priority: 'low',
    type: 'lecture',
    sentiment: 'EPISTEMIC_CURIOSITY',
    level: 'reply',
    parentId: '2',
    parentTitle: 'Understanding Supervised Learning',
    link: 'https://canvas.university.edu/courses/123/discussion_topics/1#entry-2-2',
    replyCount: 0,
    suggestedReply: ''
  },
  {
    id: '2-3',
    title: 'Re: Understanding Supervised Learning',
    content: 'Linear regression, logistic regression, decision trees, and neural networks are all examples of supervised learning algorithms.',
    author: 'Emma Chen',
    authorEmail: 'emma.chen@university.edu',
    createdAt: '2024-09-20T12:15:00Z',
    updatedAt: '2024-09-20T12:15:00Z',
    priority: 'low',
    type: 'lecture',
    sentiment: 'EPISTEMIC_CURIOSITY',
    level: 'reply',
    parentId: '2',
    parentTitle: 'Understanding Supervised Learning',
    link: 'https://canvas.university.edu/courses/123/discussion_topics/1#entry-2-3',
    replyCount: 0,
    suggestedReply: ''
  },
  {
    id: '3',
    title: 'Data Structures Assignment Discussion',
    content: 'Regarding the binary tree traversal assignment, are any students facing difficulties? We can discuss together.',
    author: 'TA Mike Wilson',
    authorEmail: 'mike.wilson@university.edu',
    createdAt: '2024-09-19T14:20:00Z',
    updatedAt: '2024-09-19T14:20:00Z',
    priority: 'high',
    type: 'assignment',
    sentiment: 'PRODUCTIVE_STRUGGLE',
    level: 'topic',
    link: 'https://canvas.university.edu/courses/124/discussion_topics/3',
    replyCount: 1,
    suggestedReply: 'I suggest understanding binary tree traversal from a recursive perspective.'
  },
  {
    id: '4',
    title: 'Preorder Traversal Implementation',
    content: 'I am having trouble implementing preorder traversal, particularly with the recursive part.',
    author: 'Alex Rodriguez',
    authorEmail: 'alex.rodriguez@university.edu',
    createdAt: '2024-09-19T15:10:00Z',
    updatedAt: '2024-09-19T15:10:00Z',
    priority: 'medium',
    type: 'assignment',
    sentiment: 'PRODUCTIVE_STRUGGLE',
    level: 'post',
    parentId: '3',
    parentTitle: 'Data Structures Assignment Discussion',
    link: 'https://canvas.university.edu/courses/124/discussion_topics/3#entry-4',
    replyCount: 2,
    suggestedReply: 'Try drawing a diagram to understand the recursive process: visit root first, then recursively traverse left and right subtrees.'
  },
  {
    id: '4-1',
    title: 'Re: Preorder Traversal Implementation',
    content: 'I can help! The key is to process the node before its children. Here\'s a simple recursive approach: process current node, then recursively call on left subtree, then right subtree.',
    author: 'TA Mike Wilson',
    authorEmail: 'mike.wilson@university.edu',
    createdAt: '2024-09-19T15:30:00Z',
    updatedAt: '2024-09-19T15:30:00Z',
    priority: 'medium',
    type: 'assignment',
    sentiment: 'EPISTEMIC_CURIOSITY',
    level: 'reply',
    parentId: '4',
    parentTitle: 'Preorder Traversal Implementation',
    link: 'https://canvas.university.edu/courses/124/discussion_topics/3#entry-4-1',
    replyCount: 0,
    suggestedReply: ''
  },
  {
    id: '4-2',
    title: 'Re: Preorder Traversal Implementation',
    content: 'Thank you! That makes sense. I was overcomplicating it. The recursive structure is much clearer now.',
    author: 'Alex Rodriguez',
    authorEmail: 'alex.rodriguez@university.edu',
    createdAt: '2024-09-19T16:00:00Z',
    updatedAt: '2024-09-19T16:00:00Z',
    priority: 'low',
    type: 'assignment',
    sentiment: 'EPISTEMIC_CURIOSITY',
    level: 'reply',
    parentId: '4',
    parentTitle: 'Preorder Traversal Implementation',
    link: 'https://canvas.university.edu/courses/124/discussion_topics/3#entry-4-2',
    replyCount: 0,
    suggestedReply: ''
  },
  {
    id: '5',
    title: 'Python Workshop Feedback',
    content: 'Today\'s Python workshop was very comprehensive, especially the data analysis section.',
    author: 'Sarah Kim',
    authorEmail: 'sarah.kim@university.edu',
    createdAt: '2024-09-18T16:45:00Z',
    updatedAt: '2024-09-18T16:45:00Z',
    priority: 'low',
    type: 'workshop',
    sentiment: 'EPISTEMIC_CURIOSITY',
    level: 'topic',
    link: 'https://canvas.university.edu/courses/125/discussion_topics/5',
    replyCount: 1,
    suggestedReply: 'Great to hear your positive feedback! Feel free to continue the discussion with any specific questions.'
  },
  {
    id: '6',
    title: 'About Using Pandas Library',
    content: 'The pandas library mentioned in the workshop is indeed powerful, but the syntax seems a bit complex.',
    author: 'David Park',
    authorEmail: 'david.park@university.edu',
    createdAt: '2024-09-18T17:30:00Z',
    updatedAt: '2024-09-18T17:30:00Z',
    priority: 'medium',
    type: 'workshop',
    sentiment: 'CONFUSION',
    level: 'post',
    parentId: '5',
    parentTitle: 'Python Workshop Feedback',
    link: 'https://canvas.university.edu/courses/125/discussion_topics/5#entry-6',
    replyCount: 1,
    suggestedReply: 'I recommend practicing with basic operations first, starting with simple data processing tasks.'
  },
  {
    id: '6-1',
    title: 'Re: About Using Pandas Library',
    content: 'I felt the same way initially! But once you get used to it, pandas becomes very intuitive. Start with basic operations like reading CSV files and selecting columns.',
    author: 'Sarah Kim',
    authorEmail: 'sarah.kim@university.edu',
    createdAt: '2024-09-18T18:00:00Z',
    updatedAt: '2024-09-18T18:00:00Z',
    priority: 'low',
    type: 'workshop',
    sentiment: 'EPISTEMIC_CURIOSITY',
    level: 'reply',
    parentId: '6',
    parentTitle: 'About Using Pandas Library',
    link: 'https://canvas.university.edu/courses/125/discussion_topics/5#entry-6-1',
    replyCount: 0,
    suggestedReply: ''
  },
  {
    id: '7',
    title: 'Algorithm Complexity Analysis',
    content: 'Could you help me better understand the concepts of time complexity and space complexity?',
    author: 'Lisa Thompson',
    authorEmail: 'lisa.thompson@university.edu',
    createdAt: '2024-09-17T09:15:00Z',
    updatedAt: '2024-09-17T09:15:00Z',
    priority: 'high',
    type: 'lecture',
    sentiment: 'EPISTEMIC_CURIOSITY',
    level: 'topic',
    link: 'https://canvas.university.edu/courses/123/discussion_topics/7',
    replyCount: 1,
    suggestedReply: 'You can understand this through concrete algorithm examples, such as complexity analysis of sorting algorithms.'
  },
  {
    id: '8',
    title: 'Questions about Big O Notation',
    content: 'In Big O notation, why can constant terms be ignored? Is this approach accurate?',
    author: 'James Brown',
    authorEmail: 'james.brown@university.edu',
    createdAt: '2024-09-17T10:45:00Z',
    updatedAt: '2024-09-17T10:45:00Z',
    priority: 'medium',
    type: 'lecture',
    sentiment: 'CONFUSION',
    level: 'post',
    parentId: '7',
    parentTitle: 'Algorithm Complexity Analysis',
    link: 'https://canvas.university.edu/courses/123/discussion_topics/7#entry-8',
    replyCount: 0,
    suggestedReply: 'Big O notation focuses on growth trends. When input size is large enough, the dominant term determines the overall behavior.'
  },
  {
    id: '9',
    title: 'JavaScript Fundamentals Workshop',
    content: 'Looking forward to tomorrow\'s JavaScript workshop. Any preparation materials we should review beforehand?',
    author: 'Maria Garcia',
    authorEmail: 'maria.garcia@university.edu',
    createdAt: '2024-09-16T13:20:00Z',
    updatedAt: '2024-09-16T13:20:00Z',
    priority: 'low',
    type: 'workshop',
    sentiment: 'EPISTEMIC_CURIOSITY',
    level: 'topic',
    link: 'https://canvas.university.edu/courses/126/discussion_topics/9',
    replyCount: 0,
    suggestedReply: 'Please review basic HTML and CSS concepts. We\'ll start with DOM manipulation examples.'
  },
  {
    id: '10',
    title: 'Database Design Assignment Help',
    content: 'I\'m struggling with normalizing my database schema for the final project. Could someone provide guidance?',
    author: 'Kevin Lee',
    authorEmail: 'kevin.lee@university.edu',
    createdAt: '2024-09-15T11:30:00Z',
    updatedAt: '2024-09-15T11:30:00Z',
    priority: 'high',
    type: 'assignment',
    sentiment: 'PRODUCTIVE_STRUGGLE',
    level: 'topic',
    link: 'https://canvas.university.edu/courses/127/discussion_topics/10',
    replyCount: 0,
    suggestedReply: 'Start by identifying functional dependencies, then apply the normalization forms step by step.'
  },
  {
    id: '11',
    title: 'URGENT: I will fail this course!',
    content: 'I am panicking! I cannot understand anything and the exam is next week. If I fail this course, I cannot graduate! Please help me immediately!',
    author: 'Student X',
    authorEmail: 'student.x@university.edu',
    createdAt: '2024-09-14T20:00:00Z',
    updatedAt: '2024-09-14T20:00:00Z',
    priority: 'high',
    type: 'assignment',
    sentiment: 'ACADEMIC_DESPERATION',
    level: 'topic',
    link: 'https://canvas.university.edu/courses/128/discussion_topics/11',
    replyCount: 1,
    suggestedReply: 'This requires immediate intervention. Please contact the student directly and provide academic support resources.'
  },
  {
    id: '12',
    title: 'Canvas keeps crashing!',
    content: 'I am so frustrated! Canvas platform keeps crashing when I try to submit my assignment. This is the third time today. The website is completely broken!',
    author: 'Student Y',
    authorEmail: 'student.y@university.edu',
    createdAt: '2024-09-13T15:30:00Z',
    updatedAt: '2024-09-13T15:30:00Z',
    priority: 'medium',
    type: 'assignment',
    sentiment: 'TECHNOSTRESS',
    level: 'post',
    parentId: '11',
    parentTitle: 'URGENT: I will fail this course!',
    link: 'https://canvas.university.edu/courses/128/discussion_topics/11#entry-12',
    replyCount: 0,
    suggestedReply: 'Please contact IT support for technical issues with Canvas platform.'
  },
  {
    id: '13',
    title: 'This course is so boring',
    content: 'I don\'t see the point of these assignments. They are meaningless and don\'t help me learn anything useful. I\'m just going through the motions.',
    author: 'Student Z',
    authorEmail: 'student.z@university.edu',
    createdAt: '2024-09-12T10:15:00Z',
    updatedAt: '2024-09-12T10:15:00Z',
    priority: 'low',
    type: 'lecture',
    sentiment: 'BOREDOM',
    level: 'topic',
    link: 'https://canvas.university.edu/courses/129/discussion_topics/13',
    replyCount: 0,
    suggestedReply: 'This indicates student disengagement. Consider reaching out to understand their learning goals.'
  },
  {
    id: '14',
    title: 'The professor is terrible',
    content: 'This professor doesn\'t know how to teach. The lectures are useless and the assignments are unfair. This is a waste of my time and money.',
    author: 'Student W',
    authorEmail: 'student.w@university.edu',
    createdAt: '2024-09-11T14:20:00Z',
    updatedAt: '2024-09-11T14:20:00Z',
    priority: 'medium',
    type: 'lecture',
    sentiment: 'HOSTILITY',
    level: 'post',
    parentId: '13',
    parentTitle: 'This course is so boring',
    link: 'https://canvas.university.edu/courses/129/discussion_topics/13#entry-14',
    replyCount: 0,
    suggestedReply: 'This contains hostile language. Monitor the discussion and consider moderation.'
  }
];

// Mock admin data
export const mockAdminData: Admin[] = [
  {
    id: '1',
    name: 'Dr. Emily Johnson',
    email: 'emily.johnson@university.edu',
    createdAt: '2024-01-15T08:00:00Z'
  },
  {
    id: '2',
    name: 'Mike Wilson',
    email: 'mike.wilson@university.edu',
    createdAt: '2024-02-20T10:30:00Z'
  },
  {
    id: '3',
    name: 'Prof. Sarah Davis',
    email: 'sarah.davis@university.edu',
    createdAt: '2024-03-10T14:15:00Z'
  },
  {
    id: '4',
    name: 'Dr. Robert Chen',
    email: 'robert.chen@university.edu',
    createdAt: '2024-04-05T09:20:00Z'
  }
];

// Mock login accounts data
export const mockLoginAccounts: LoginAccount[] = [
  {
    id: '1',
    username: 'admin',
    password: 'password123',
    email: 'admin@university.edu',
    role: 'admin',
    createdAt: '2024-01-15T08:00:00Z'
  },
  {
    id: '2',
    username: 'user1',
    password: 'password123',
    email: 'user1@university.edu',
    role: 'user',
    createdAt: '2024-02-20T10:30:00Z'
  },
  {
    id: '3',
    username: 'user2',
    password: 'password123',
    email: 'user2@university.edu',
    role: 'user',
    createdAt: '2024-03-10T14:15:00Z'
  }
];

// Mock email notifications data
export const mockEmailNotifications: EmailNotification[] = [
  {
    id: 'notif-1',
    loginAccountId: '1',
    email: 'admin@university.edu',
    enabled: true,
    createdAt: '2024-01-15T08:00:00Z'
  },
  {
    id: 'notif-2',
    loginAccountId: '2',
    email: 'user1@university.edu',
    enabled: true,
    createdAt: '2024-02-20T10:30:00Z'
  },
  {
    id: 'notif-3',
    loginAccountId: '3',
    email: 'user2@university.edu',
    enabled: true,
    createdAt: '2024-03-10T14:15:00Z'
  }
];

// Get dashboard statistics
export const getDashboardStats = (): DashboardStats => {
  const topics = mockDiscussionData.filter(item => item.level === 'topic').length;
  const posts = mockDiscussionData.filter(item => item.level === 'post').length;
  const replies = mockDiscussionData.filter(item => item.level === 'reply').length;
  
  return {
    totalTopics: topics,
    totalPosts: posts,
    totalReplies: replies
  };
};

// Get chart data
export const getChartData = (): ChartData => {
  const priorityCount = {
    low: mockDiscussionData.filter(item => item.priority === 'low').length,
    medium: mockDiscussionData.filter(item => item.priority === 'medium').length,
    high: mockDiscussionData.filter(item => item.priority === 'high').length
  };

  const typeCount = {
    lecture: mockDiscussionData.filter(item => item.type === 'lecture').length,
    workshop: mockDiscussionData.filter(item => item.type === 'workshop').length,
    assignment: mockDiscussionData.filter(item => item.type === 'assignment').length
  };

  // Sentiment category mapping with colors and display names
  const sentimentCategories = {
    ACADEMIC_DESPERATION: { name: 'Academic Desperation', color: '#ef4444' },
    PRODUCTIVE_STRUGGLE: { name: 'Productive Struggle', color: '#3b82f6' },
    CONFUSION: { name: 'Confusion', color: '#f59e0b' },
    TECHNOSTRESS: { name: 'Technostress', color: '#8b5cf6' },
    BOREDOM: { name: 'Boredom', color: '#6b7280' },
    HOSTILITY: { name: 'Hostility', color: '#dc2626' },
    EPISTEMIC_CURIOSITY: { name: 'Epistemic Curiosity', color: '#10b981' }
  };

  // Count sentiment occurrences
  const sentimentCount: Record<keyof typeof sentimentCategories, number> = {
    ACADEMIC_DESPERATION: mockDiscussionData.filter(item => item.sentiment === 'ACADEMIC_DESPERATION').length,
    PRODUCTIVE_STRUGGLE: mockDiscussionData.filter(item => item.sentiment === 'PRODUCTIVE_STRUGGLE').length,
    CONFUSION: mockDiscussionData.filter(item => item.sentiment === 'CONFUSION').length,
    TECHNOSTRESS: mockDiscussionData.filter(item => item.sentiment === 'TECHNOSTRESS').length,
    BOREDOM: mockDiscussionData.filter(item => item.sentiment === 'BOREDOM').length,
    HOSTILITY: mockDiscussionData.filter(item => item.sentiment === 'HOSTILITY').length,
    EPISTEMIC_CURIOSITY: mockDiscussionData.filter(item => item.sentiment === 'EPISTEMIC_CURIOSITY').length
  };

  // Sort by priority: ACADEMIC_DESPERATION > HOSTILITY > CONFUSION > BOREDOM > TECHNOSTRESS > PRODUCTIVE_STRUGGLE > EPISTEMIC_CURIOSITY
  const sentimentOrder: Array<keyof typeof sentimentCategories> = [
    'ACADEMIC_DESPERATION',
    'HOSTILITY',
    'CONFUSION',
    'BOREDOM',
    'TECHNOSTRESS',
    'PRODUCTIVE_STRUGGLE',
    'EPISTEMIC_CURIOSITY'
  ];

  const sentimentData = sentimentOrder.map(key => ({
    value: sentimentCount[key],
    name: sentimentCategories[key].name,
    color: sentimentCategories[key].color
  }));

  return {
    priorityData: [
      { value: priorityCount.low, name: 'Low Priority' },
      { value: priorityCount.medium, name: 'Medium Priority' },
      { value: priorityCount.high, name: 'High Priority' }
    ],
    typeData: [
      { value: typeCount.lecture, name: 'Lecture' },
      { value: typeCount.workshop, name: 'Workshop' },
      { value: typeCount.assignment, name: 'Assignment' }
    ],
    sentimentData
  };
};
