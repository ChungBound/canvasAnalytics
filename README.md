# LMS(LearningManagementSystem) EarlySense

一个基于 React、Next.js 和 TypeScript 构建的前端应用，用于分析和报告大学 Canvas 讨论数据。

## 功能特性

### 页面布局
- 顶部导航栏：系统图标（点击返回首页）和菜单导航
- 响应式设计，支持桌面和移动设备

### 报告页面 (/report)
- **数据总览**：显示讨论主题、帖子和回复的数量统计
- **数据可视化**：
  - 优先级分布饼图（低/中/高）
  - 类型分布饼图（讲座/工作坊/作业）
  - 情感分析柱状图（积极/消极/中性）
- **数据列表**：
  - 显示主题/帖子/回复三种类型的数据
  - 默认按时间倒序排列
  - 支持按回复数量排序（升序/降序）
- **搜索和筛选**：
  - 按优先级、类型、情感、层级筛选
  - 支持ID、作者和内容搜索
- **详情模态框**：显示完整的帖子详细信息

### 配置页面 (/config)
- **管理员管理**：
  - 查看当前管理员列表
  - 添加、编辑、删除管理员
  - 搜索管理员功能
- **主题切换**：日间/夜间模式切换
- **系统信息**：显示系统版本和统计信息

## 技术栈

- **框架**：Next.js 14 (App Router)
- **语言**：TypeScript
- **UI框架**：Tailwind CSS
- **图表库**：ECharts (echarts-for-react)
- **图标**：Lucide React
- **状态管理**：React Hooks + Context API

## 安装和运行

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 项目结构

```
src/
├── app/                 # Next.js 应用路由
│   ├── page.tsx        # 首页
│   ├── report/         # 报告页面
│   ├── config/         # 配置页面
│   ├── layout.tsx      # 根布局
│   └── globals.css     # 全局样式
├── components/         # React 组件
│   ├── Layout.tsx      # 主布局组件
│   ├── StatsCards.tsx  # 统计卡片
│   ├── Charts.tsx      # 图表组件
│   ├── SearchFilter.tsx# 搜索筛选
│   ├── DataList.tsx    # 数据列表
│   └── DetailModal.tsx # 详情模态框
├── contexts/           # React Context
│   └── ThemeContext.tsx# 主题上下文
├── data/              # 模拟数据
│   └── mockData.ts    # 模拟数据和API
└── types/             # TypeScript 类型定义
    └── index.ts       # 数据类型
```

## 数据结构

系统使用模拟数据，包含以下主要数据类型：

- **DiscussionItem**：讨论数据（主题/帖子/回复）
- **Admin**：管理员信息
- **DashboardStats**：仪表板统计
- **ChartData**：图表数据
- **FilterOptions**：筛选选项
- **SortOptions**：排序选项

## 功能演示

1. **首页**：系统概览和快速导航
2. **报告页面**：完整的数据分析和可视化
3. **配置页面**：管理员管理和系统设置

所有数据都是模拟的，无需连接真实的后端API。界面支持完整的交互功能，包括搜索、筛选、排序和主题切换。