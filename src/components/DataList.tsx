"use client";

import React from "react";
import { Eye, Calendar, User, MessageSquare } from "lucide-react";
import { DiscussionItem } from "@/types";

interface DataListProps {
  items: DiscussionItem[];
  onViewDetail: (item: DiscussionItem) => void;
}

const DataList: React.FC<DataListProps> = ({ items, onViewDetail }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "negative":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      case "neutral":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getTypeDisplay = (type: string) => {
    switch (type) {
      case "lecture":
        return "讲座";
      case "workshop":
        return "工作坊";
      case "assignment":
        return "作业";
      default:
        return type;
    }
  };

  const getPriorityDisplay = (priority: string) => {
    switch (priority) {
      case "high":
        return "高";
      case "medium":
        return "中";
      case "low":
        return "低";
      default:
        return priority;
    }
  };

  const getSentimentDisplay = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "积极";
      case "negative":
        return "消极";
      case "neutral":
        return "中性";
      default:
        return sentiment;
    }
  };

  const getLevelDisplay = (level: string) => {
    switch (level) {
      case "topic":
        return "主题";
      case "post":
        return "帖子";
      case "reply":
        return "回复";
      default:
        return level;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "topic":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "post":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
      case "reply":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">没有找到匹配的数据</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          讨论数据列表 ({items.length} 条记录)
        </h3>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                {/* 标题和标签 */}
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                    {item.title}
                  </h4>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(
                      item.level
                    )}`}
                  >
                    {getLevelDisplay(item.level)}
                  </span>
                </div>

                {/* 标签组 */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                      item.priority
                    )}`}
                  >
                    优先级: {getPriorityDisplay(item.priority)}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                    {getTypeDisplay(item.type)}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(
                      item.sentiment
                    )}`}
                  >
                    {getSentimentDisplay(item.sentiment)}
                  </span>
                </div>

                {/* 内容预览 */}
                <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                  {item.content}
                </p>

                {/* 元信息 */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{item.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(item.createdAt)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>{item.replyCount} 回复</span>
                  </div>
                  {item.parentTitle && (
                    <div className="text-xs">
                      <span className="text-gray-400">父级: </span>
                      <span className="text-gray-600 dark:text-gray-300">
                        {item.parentTitle}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="ml-4 flex-shrink-0">
                <button
                  onClick={() => onViewDetail(item)}
                  className="flex items-center space-x-2 px-3 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-md hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>查看详情</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataList;
