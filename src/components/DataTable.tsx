"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Eye,
  Calendar,
  User,
  MessageSquare,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronRight,
} from "lucide-react";
import { DiscussionItem } from "@/types";
import Tooltip from "./Tooltip";

interface DataTableProps {
  items: DiscussionItem[];
  onViewDetail: (item: DiscussionItem) => void;
  currentLevel?: "topic" | "post" | "reply";
  topicId?: string;
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

const DataTable: React.FC<DataTableProps> = ({
  items,
  onViewDetail,
  currentLevel = "topic",
  topicId,
}) => {
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
      case "ACADEMIC_DESPERATION":
        return "badge-danger";
      case "HOSTILITY":
        return "badge-danger";
      case "CONFUSION":
        return "badge-warning";
      case "BOREDOM":
        return "badge-gray";
      case "TECHNOSTRESS":
        return "badge-purple";
      case "PRODUCTIVE_STRUGGLE":
        return "badge-primary";
      case "EPISTEMIC_CURIOSITY":
        return "badge-success";
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

  const getSentimentDisplayName = (sentiment: string) => {
    const sentimentMap: Record<string, string> = {
      ACADEMIC_DESPERATION: "Academic Desperation",
      PRODUCTIVE_STRUGGLE: "Productive Struggle",
      CONFUSION: "Confusion",
      TECHNOSTRESS: "Technostress",
      BOREDOM: "Boredom",
      HOSTILITY: "Hostility",
      EPISTEMIC_CURIOSITY: "Epistemic Curiosity",
    };
    return sentimentMap[sentiment] || capitalizeFirst(sentiment);
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

      <div className="overflow-x-auto lg:overflow-x-visible overflow-y-visible">
        <table className="table min-w-full">
          <thead className="table-header">
            <tr>
              <th className="px-4 py-4 text-left font-semibold text-gray-900 dark:text-white w-[22%] min-w-[180px]">
                <span>Content</span>
              </th>
              <th className="px-4 py-4 text-left font-semibold text-gray-900 dark:text-white w-[14%] min-w-[110px]">
                <button
                  onClick={() => handleSort("author")}
                  className="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span>Author</span>
                  {getSortIcon("author")}
                </button>
              </th>
              <th className="px-4 py-4 text-left font-semibold text-gray-900 dark:text-white w-[16%] min-w-[130px]">
                <button
                  onClick={() => handleSort("createdAt")}
                  className="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span>Date</span>
                  {getSortIcon("createdAt")}
                </button>
              </th>
              <th className="px-4 py-4 text-center font-semibold text-gray-900 dark:text-white w-[8%] min-w-[70px]">
                <span>Level</span>
              </th>
              <th className="px-4 py-4 text-left font-semibold text-gray-900 dark:text-white w-[20%] min-w-[160px]">
                <span>Tags</span>
              </th>
              <th className="px-4 py-4 text-center font-semibold text-gray-900 dark:text-white w-[8%] min-w-[70px]">
                <button
                  onClick={() => handleSort("replyCount")}
                  className="flex items-center justify-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors w-full"
                >
                  <span>Replies</span>
                  {getSortIcon("replyCount")}
                </button>
              </th>
              <th className="px-4 py-4 text-center font-semibold text-gray-900 dark:text-white w-[12%] min-w-[90px]">
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
                {/* Content */}
                <td className="px-4 py-4 align-middle">
                  <div className="max-w-md">
                    <Tooltip content={item.content}>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed cursor-help">
                        {item.content.length > 20
                          ? `${item.content.substring(0, 20)}...`
                          : item.content}
                      </p>
                    </Tooltip>
                  </div>
                </td>

                {/* Author */}
                <td className="px-4 py-4 align-middle">
                  <div
                    className="flex items-center space-x-2"
                    style={{ alignItems: "center" }}
                  >
                    <div
                      className="w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <User className="w-3 h-3 text-white" />
                    </div>
                    <div
                      className="min-w-0"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        lineHeight: "1",
                      }}
                    >
                      <p
                        className="font-medium text-gray-900 dark:text-white text-sm truncate"
                        style={{ lineHeight: "1", margin: "0", padding: "0" }}
                      >
                        {item.author}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Date */}
                <td className="px-4 py-4 align-middle">
                  <div className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    <span className="font-medium">
                      {new Date(item.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="mx-1 text-gray-400">•</span>
                    <span className="text-gray-500">
                      {new Date(item.createdAt).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </td>

                {/* Level */}
                <td className="px-4 py-4 align-middle text-center">
                  <span
                    className={`badge text-xs ${getLevelColor(item.level)}`}
                  >
                    {capitalizeFirst(item.level)}
                  </span>
                </td>

                {/* Tags (Priority, Type, Sentiment) */}
                <td className="px-4 py-4 align-middle">
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <span
                      className={`badge text-xs ${getPriorityColor(
                        item.priority
                      )}`}
                    >
                      {capitalizeFirst(item.priority)}
                    </span>
                    <span
                      className={`badge text-xs ${getTypeColor(item.type)}`}
                    >
                      {capitalizeFirst(item.type)}
                    </span>
                    <span
                      className={`badge text-xs ${getSentimentColor(
                        item.sentiment
                      )}`}
                    >
                      {getSentimentDisplayName(item.sentiment)}
                    </span>
                  </div>
                </td>

                {/* Replies */}
                <td className="px-4 py-4 align-middle text-center">
                  <div className="flex items-center justify-center space-x-1 text-gray-600 dark:text-gray-400">
                    <MessageSquare className="w-3 h-3" />
                    <span className="font-semibold text-sm">
                      {item.replyCount}
                    </span>
                  </div>
                </td>

                {/* Actions */}
                <td className="px-4 py-4 align-middle text-center">
                  <div className="flex flex-col items-center justify-center gap-1.5">
                    <button
                      onClick={() => onViewDetail(item)}
                      className="btn btn-primary btn-sm px-2.5 py-1 text-xs hover:shadow-md transition-all whitespace-nowrap w-[75px] flex items-center justify-center"
                      title="View Details"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      <span>Details</span>
                    </button>
                    {/* Show Next button based on item level and current context */}
                    {/* Case 1: Table page - topic level (currentLevel="topic" and no topicId) */}
                    {currentLevel === "topic" &&
                      topicId === undefined &&
                      item.level === "topic" && (
                        <Link
                          href={`/table/${item.id}`}
                          className="btn btn-sm px-2.5 py-1 text-xs hover:shadow-md transition-all whitespace-nowrap w-[75px] flex items-center justify-center bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 shadow-sm"
                          title="Go to Next Level"
                        >
                          <ChevronRight className="w-3 h-3 mr-1" />
                          <span>Next</span>
                        </Link>
                      )}
                    {/* Case 2: Table page - post level (currentLevel="post" and has topicId) */}
                    {currentLevel === "post" &&
                      topicId &&
                      item.level === "post" && (
                        <Link
                          href={`/table/${topicId}/${item.id}`}
                          className="btn btn-sm px-2.5 py-1 text-xs hover:shadow-md transition-all whitespace-nowrap w-[75px] flex items-center justify-center bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 shadow-sm"
                          title="Go to Next Level"
                        >
                          <ChevronRight className="w-3 h-3 mr-1" />
                          <span>Next</span>
                        </Link>
                      )}
                    {/* Case 3: Report page - use item.level (currentLevel is undefined or default "topic" but we're in report page) */}
                    {/* For topic items in report page */}
                    {currentLevel === undefined && item.level === "topic" && (
                      <Link
                        href={`/table/${item.id}`}
                        className="btn btn-sm px-2.5 py-1 text-xs hover:shadow-md transition-all whitespace-nowrap w-[75px] flex items-center justify-center bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 shadow-sm"
                        title="Go to Next Level"
                      >
                        <ChevronRight className="w-3 h-3 mr-1" />
                        <span>Next</span>
                      </Link>
                    )}
                    {/* For post items in report page */}
                    {currentLevel === undefined &&
                      item.level === "post" &&
                      item.parentId && (
                        <Link
                          href={`/table/${item.parentId}/${item.id}`}
                          className="btn btn-sm px-2.5 py-1 text-xs hover:shadow-md transition-all whitespace-nowrap w-[75px] flex items-center justify-center bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 shadow-sm"
                          title="Go to Next Level"
                        >
                          <ChevronRight className="w-3 h-3 mr-1" />
                          <span>Next</span>
                        </Link>
                      )}
                    {/* Reply level doesn't have next button - it's the bottom level */}
                    {/* Reply level doesn't have next button - it's the bottom level */}
                  </div>
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
