"use client";

import React from "react";
import { MessageSquare, MessageCircle, Reply } from "lucide-react";
import { DashboardStats } from "@/types";

interface StatsCardsProps {
  stats: DashboardStats;
  onCardClick?: (level: 'topic' | 'post' | 'reply') => void;
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats, onCardClick }) => {
  const cards = [
    {
      title: "Discussion Topics",
      value: stats.totalTopics,
      icon: MessageSquare,
      gradient: "from-blue-500 to-blue-600",
      bgGradient:
        "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/30",
      description: "Total discussion topics",
      level: "topic" as const,
    },
    {
      title: "Posts",
      value: stats.totalPosts,
      icon: MessageCircle,
      gradient: "from-yellow-500 to-yellow-600",
      bgGradient:
        "from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/30",
      description: "Total posts created",
      level: "post" as const,
    },
    {
      title: "Replies",
      value: stats.totalReplies,
      icon: Reply,
      gradient: "from-gray-500 to-gray-600",
      bgGradient:
        "from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/30",
      description: "Total replies posted",
      level: "reply" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            onClick={() => onCardClick && onCardClick(card.level)}
            className={`bg-gradient-to-br ${card.bgGradient} rounded-2xl p-6 shadow-elegant hover:shadow-elegant-lg transition-all duration-300 border border-white/50 dark:border-gray-700/50 group ${
              onCardClick ? "cursor-pointer" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {card.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {card.value.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {card.description}
                </p>
              </div>
              <div
                className={`bg-gradient-to-r ${card.gradient} p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
