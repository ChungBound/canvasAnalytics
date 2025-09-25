"use client";

import React, { useState } from "react";
import {
  Eye,
  Calendar,
  User,
  MessageSquare,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { DiscussionItem } from "@/types";

interface DataTableProps {
  items: DiscussionItem[];
  onViewDetail: (item: DiscussionItem) => void;
}

type SortField =
  | "title"
  | "author"
  | "createdAt"
  | "replyCount"
  | "priority"
  | "type"
  | "sentiment";
type SortDirection = "asc" | "desc";

const DataTable: React.FC<DataTableProps> = ({ items, onViewDetail }) => {
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "badge-danger";
      case "medium":
        return "badge-warning";
      case "low":
        return "badge-success";
      default:
        return "badge-gray";
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "badge-success";
      case "negative":
        return "badge-danger";
      case "neutral":
        return "badge-gray";
      default:
        return "badge-gray";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "lecture":
        return "badge-primary";
      case "workshop":
        return "badge-warning";
      case "assignment":
        return "badge-danger";
      default:
        return "badge-gray";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "topic":
        return "badge-primary";
      case "post":
        return "badge-warning";
      case "reply":
        return "badge-gray";
      default:
        return "badge-gray";
    }
  };

  const capitalizeFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="w-4 h-4 text-blue-600" />
    ) : (
      <ArrowDown className="w-4 h-4 text-blue-600" />
    );
  };

  const sortedItems = [...items].sort((a, b) => {
    let aValue: any, bValue: any;

    switch (sortField) {
      case "createdAt":
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
        break;
      case "replyCount":
        aValue = a.replyCount;
        bValue = b.replyCount;
        break;
      default:
        aValue = a[sortField];
        bValue = b[sortField];
    }

    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  if (items.length === 0) {
    return (
      <div className="card p-12 text-center">
        <div className="text-gray-400 mb-4">
          <MessageSquare className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No discussions found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Try adjusting your search criteria or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Discussion Data ({items.length} records)
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead className="table-header">
            <tr>
              <th className="table-cell text-left font-semibold text-gray-900 dark:text-white">
                <button
                  onClick={() => handleSort("title")}
                  className="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span>Title</span>
                  {getSortIcon("title")}
                </button>
              </th>
              <th className="table-cell text-left font-semibold text-gray-900 dark:text-white">
                <button
                  onClick={() => handleSort("author")}
                  className="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span>Author</span>
                  {getSortIcon("author")}
                </button>
              </th>
              <th className="table-cell text-left font-semibold text-gray-900 dark:text-white">
                <button
                  onClick={() => handleSort("createdAt")}
                  className="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span>Created</span>
                  {getSortIcon("createdAt")}
                </button>
              </th>
              <th className="table-cell text-left font-semibold text-gray-900 dark:text-white">
                <button
                  onClick={() => handleSort("priority")}
                  className="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span>Priority</span>
                  {getSortIcon("priority")}
                </button>
              </th>
              <th className="table-cell text-left font-semibold text-gray-900 dark:text-white">
                <button
                  onClick={() => handleSort("type")}
                  className="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span>Type</span>
                  {getSortIcon("type")}
                </button>
              </th>
              <th className="table-cell text-left font-semibold text-gray-900 dark:text-white">
                Level
              </th>
              <th className="table-cell text-left font-semibold text-gray-900 dark:text-white">
                <button
                  onClick={() => handleSort("sentiment")}
                  className="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span>Sentiment</span>
                  {getSortIcon("sentiment")}
                </button>
              </th>
              <th className="table-cell text-left font-semibold text-gray-900 dark:text-white">
                <button
                  onClick={() => handleSort("replyCount")}
                  className="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span>Replies</span>
                  {getSortIcon("replyCount")}
                </button>
              </th>
              <th className="table-cell text-left font-semibold text-gray-900 dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {sortedItems.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <td className="table-cell">
                  <div className="max-w-xs">
                    <p className="font-medium text-gray-900 dark:text-white truncate">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {item.content.substring(0, 80)}...
                    </p>
                  </div>
                </td>
                <td className="table-cell">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {item.author}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="table-cell">
                  <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {formatDate(item.createdAt)}
                    </span>
                  </div>
                </td>
                <td className="table-cell">
                  <span className={`badge ${getPriorityColor(item.priority)}`}>
                    {capitalizeFirst(item.priority)}
                  </span>
                </td>
                <td className="table-cell">
                  <span className={`badge ${getTypeColor(item.type)}`}>
                    {capitalizeFirst(item.type)}
                  </span>
                </td>
                <td className="table-cell">
                  <span className={`badge ${getLevelColor(item.level)}`}>
                    {capitalizeFirst(item.level)}
                  </span>
                </td>
                <td className="table-cell">
                  <span
                    className={`badge ${getSentimentColor(item.sentiment)}`}
                  >
                    {capitalizeFirst(item.sentiment)}
                  </span>
                </td>
                <td className="table-cell">
                  <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                    <MessageSquare className="w-4 h-4" />
                    <span className="font-medium">{item.replyCount}</span>
                  </div>
                </td>
                <td className="table-cell">
                  <button
                    onClick={() => onViewDetail(item)}
                    className="btn btn-primary btn-sm flex items-center space-x-1"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="hidden sm:inline">View Details</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
