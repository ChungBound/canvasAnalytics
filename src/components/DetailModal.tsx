"use client";

import React from "react";
import {
  X,
  ExternalLink,
  Calendar,
  User,
  MessageSquare,
  Hash,
  Clock,
} from "lucide-react";
import { DiscussionItem } from "@/types";

interface DetailModalProps {
  item: DiscussionItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ item, isOpen, onClose }) => {
  if (!isOpen || !item) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
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

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Discussion Details
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              #{item.id} • {capitalizeFirst(item.level)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-xl transition-colors focus-ring"
          >
            <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="max-h-[calc(90vh-120px)] overflow-y-auto">
          {/* Title and Badges */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {item.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className={`badge ${getPriorityColor(item.priority)}`}>
                {capitalizeFirst(item.priority)} Priority
              </span>
              <span className={`badge ${getTypeColor(item.type)}`}>
                {capitalizeFirst(item.type)}
              </span>
              <span className={`badge ${getSentimentColor(item.sentiment)}`}>
                {capitalizeFirst(item.sentiment)} Sentiment
              </span>
              <span className={`badge ${getLevelColor(item.level)}`}>
                {capitalizeFirst(item.level)}
              </span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Author Information */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                  Author Information
                </h4>

                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {item.author}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.authorEmail}
                    </p>
                  </div>
                </div>
              </div>

              {/* Metadata */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                  Metadata
                </h4>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Created
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(item.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Last Updated
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(item.updatedAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <MessageSquare className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Reply Count
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.replyCount} replies
                      </p>
                    </div>
                  </div>

                  {item.parentTitle && (
                    <div className="flex items-center space-x-3">
                      <Hash className="w-5 h-5 text-orange-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Parent Discussion
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item.parentTitle}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                Content
              </h4>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <p className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                  {item.content}
                </p>
              </div>
            </div>

            {/* Suggested Reply */}
            {item.suggestedReply && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                  AI Suggested Reply
                </h4>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                  <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                    {item.suggestedReply}
                  </p>
                </div>
              </div>
            )}

            {/* External Link */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                Canvas Link
              </h4>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                <span className="font-medium">View in Canvas</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        {/* <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <button onClick={onClose} className="btn btn-secondary">
            Close
          </button>
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Open in Canvas
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default DetailModal;
