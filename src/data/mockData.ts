import { DiscussionItem, Admin, DashboardStats, ChartData } from '@/types';

// 模拟讨论数据
export const mockDiscussionData: DiscussionItem[] = [
  {
    id: '1',
    title: '机器学习基础概念讨论',
    content: '请大家分享一下对机器学习基础概念的理解，特别是监督学习和无监督学习的区别。',
    author: '张教授',
    authorEmail: 'zhang.prof@university.edu',
    createdAt: '2024-09-20T10:30:00Z',
    updatedAt: '2024-09-20T10:30:00Z',
    priority: 'high',
    type: 'lecture',
    sentiment: 'neutral',
    level: 'topic',
    link: 'https://canvas.university.edu/courses/123/discussion_topics/1',
    replyCount: 15,
    suggestedReply: '这是一个很好的问题，建议从数据标注的角度来理解两者的区别。'
  },
  {
    id: '2',
    title: '关于监督学习的理解',
    content: '我认为监督学习是指我们有标注好的数据集，可以训练模型预测新的数据。',
    author: '李同学',
    authorEmail: 'li.student@university.edu',
    createdAt: '2024-09-20T11:15:00Z',
    updatedAt: '2024-09-20T11:15:00Z',
    priority: 'medium',
    type: 'lecture',
    sentiment: 'positive',
    level: 'post',
    parentId: '1',
    parentTitle: '机器学习基础概念讨论',
    link: 'https://canvas.university.edu/courses/123/discussion_topics/1#entry-2',
    replyCount: 3,
    suggestedReply: '很好的理解！可以进一步补充一些具体的算法例子。'
  },
  {
    id: '3',
    title: '数据结构作业讨论',
    content: '关于二叉树遍历的作业，有同学遇到困难吗？我们可以一起讨论。',
    author: '王助教',
    authorEmail: 'wang.ta@university.edu',
    createdAt: '2024-09-19T14:20:00Z',
    updatedAt: '2024-09-19T14:20:00Z',
    priority: 'high',
    type: 'assignment',
    sentiment: 'positive',
    level: 'topic',
    link: 'https://canvas.university.edu/courses/124/discussion_topics/3',
    replyCount: 8,
    suggestedReply: '建议从递归的角度来理解二叉树遍历。'
  },
  {
    id: '4',
    title: '前序遍历的实现',
    content: '我在实现前序遍历时遇到了困难，递归部分不太理解。',
    author: '陈同学',
    authorEmail: 'chen.student@university.edu',
    createdAt: '2024-09-19T15:10:00Z',
    updatedAt: '2024-09-19T15:10:00Z',
    priority: 'medium',
    type: 'assignment',
    sentiment: 'negative',
    level: 'post',
    parentId: '3',
    parentTitle: '数据结构作业讨论',
    link: 'https://canvas.university.edu/courses/124/discussion_topics/3#entry-4',
    replyCount: 2,
    suggestedReply: '可以画个图来理解递归过程，先访问根节点，再递归左子树和右子树。'
  },
  {
    id: '5',
    title: 'Python工作坊反馈',
    content: '今天的Python工作坊内容很丰富，特别是关于数据分析的部分。',
    author: '刘同学',
    authorEmail: 'liu.student@university.edu',
    createdAt: '2024-09-18T16:45:00Z',
    updatedAt: '2024-09-18T16:45:00Z',
    priority: 'low',
    type: 'workshop',
    sentiment: 'positive',
    level: 'topic',
    link: 'https://canvas.university.edu/courses/125/discussion_topics/5',
    replyCount: 12,
    suggestedReply: '很高兴听到你的积极反馈！有什么具体问题可以继续讨论。'
  },
  {
    id: '6',
    title: '关于pandas库的使用',
    content: '工作坊中提到的pandas库确实很强大，但是语法有点复杂。',
    author: '吴同学',
    authorEmail: 'wu.student@university.edu',
    createdAt: '2024-09-18T17:30:00Z',
    updatedAt: '2024-09-18T17:30:00Z',
    priority: 'medium',
    type: 'workshop',
    sentiment: 'neutral',
    level: 'post',
    parentId: '5',
    parentTitle: 'Python工作坊反馈',
    link: 'https://canvas.university.edu/courses/125/discussion_topics/5#entry-6',
    replyCount: 1,
    suggestedReply: '建议多练习基础操作，从简单的数据处理开始。'
  },
  {
    id: '7',
    title: '算法复杂度分析',
    content: '请问老师，如何更好地理解时间复杂度和空间复杂度的概念？',
    author: '赵同学',
    authorEmail: 'zhao.student@university.edu',
    createdAt: '2024-09-17T09:15:00Z',
    updatedAt: '2024-09-17T09:15:00Z',
    priority: 'high',
    type: 'lecture',
    sentiment: 'neutral',
    level: 'topic',
    link: 'https://canvas.university.edu/courses/123/discussion_topics/7',
    replyCount: 6,
    suggestedReply: '可以通过具体的算法例子来理解，比如排序算法的复杂度分析。'
  },
  {
    id: '8',
    title: '大O表示法的疑问',
    content: '大O表示法中，为什么常数项可以忽略？这样准确吗？',
    author: '周同学',
    authorEmail: 'zhou.student@university.edu',
    createdAt: '2024-09-17T10:45:00Z',
    updatedAt: '2024-09-17T10:45:00Z',
    priority: 'medium',
    type: 'lecture',
    sentiment: 'negative',
    level: 'post',
    parentId: '7',
    parentTitle: '算法复杂度分析',
    link: 'https://canvas.university.edu/courses/123/discussion_topics/7#entry-8',
    replyCount: 0,
    suggestedReply: '大O表示法关注的是增长趋势，当输入规模足够大时，主导项起决定作用。'
  }
];

// 模拟管理员数据
export const mockAdminData: Admin[] = [
  {
    id: '1',
    name: '张教授',
    email: 'zhang.prof@university.edu',
    createdAt: '2024-01-15T08:00:00Z'
  },
  {
    id: '2',
    name: '王助教',
    email: 'wang.ta@university.edu',
    createdAt: '2024-02-20T10:30:00Z'
  },
  {
    id: '3',
    name: '李老师',
    email: 'li.teacher@university.edu',
    createdAt: '2024-03-10T14:15:00Z'
  }
];

// 获取仪表板统计数据
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

// 获取图表数据
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

  const sentimentCount = {
    positive: mockDiscussionData.filter(item => item.sentiment === 'positive').length,
    negative: mockDiscussionData.filter(item => item.sentiment === 'negative').length,
    neutral: mockDiscussionData.filter(item => item.sentiment === 'neutral').length
  };

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
    sentimentData: [
      { value: sentimentCount.positive, name: 'Positive', color: '#10b981' },
      { value: sentimentCount.negative, name: 'Negative', color: '#ef4444' },
      { value: sentimentCount.neutral, name: 'Neutral', color: '#f59e0b' }
    ]
  };
};
