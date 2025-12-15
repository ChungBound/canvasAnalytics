"use client";

import React from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  BarChart3,
  Settings,
  MessageSquare,
  TrendingUp,
  Users,
  Activity,
} from "lucide-react";
import { getDashboardStats } from "@/data/mockData";

const HomePage: React.FC = () => {
  const stats = getDashboardStats();

  const features = [
    {
      title: "Data Analytics Reports",
      description:
        "View detailed Canvas discussion statistics, chart analysis and comprehensive data listings",
      icon: BarChart3,
      href: "/report",
      gradient: "from-blue-500 to-blue-600",
      bgGradient:
        "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/30",
    },
    {
      title: "System Configuration",
      description:
        "Manage system settings, administrator accounts and interface theme switching",
      icon: Settings,
      href: "/config",
      gradient: "from-green-500 to-green-600",
      bgGradient:
        "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/30",
    },
  ];

  const quickStats = [
    {
      label: "Discussion Topics",
      value: stats.totalTopics,
      icon: MessageSquare,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "Total Posts",
      value: stats.totalPosts,
      icon: TrendingUp,
      color: "text-green-600 dark:text-green-400",
    },
    {
      label: "Total Replies",
      value: stats.totalReplies,
      icon: Activity,
      color: "text-purple-600 dark:text-purple-400",
    },
  ];

  return (
    <ProtectedRoute>
      <Layout>
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-6">
          Canvas Discussion Analytics
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
          Comprehensive analysis and reporting system for university Canvas
          discussion data with advanced insights and visualizations
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/report" className="btn btn-primary px-8 py-4 text-lg">
            <BarChart3 className="w-6 h-6 mr-3" />
            View Analytics
          </Link>
          <Link href="/config" className="btn btn-secondary px-8 py-4 text-lg">
            <Settings className="w-6 h-6 mr-3" />
            Configuration
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="card p-8 text-center group hover:shadow-elegant-lg transition-all duration-300"
            >
              <Icon
                className={`w-12 h-12 ${stat.color} mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
              />
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.value.toLocaleString()}
              </p>
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Link
              key={index}
              href={feature.href}
              className={`bg-gradient-to-br ${feature.bgGradient} rounded-2xl p-8 border border-white/50 dark:border-gray-700/50 hover:shadow-elegant-lg transition-all duration-300 transform hover:-translate-y-2 group`}
            >
              <div className="flex items-center mb-6">
                <div
                  className={`bg-gradient-to-r ${feature.gradient} p-4 rounded-xl shadow-lg mr-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                {feature.description}
              </p>
            </Link>
          );
        })}
      </div>

      {/* System Features */}
      <div className="card p-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          System Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-elegant">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Data Visualization
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Rich chart displays using ECharts, including pie charts and bar
              charts with interactive features
            </p>
          </div>
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-elegant">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Admin Management
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Convenient administrator account management with add, edit, and
              delete operations
            </p>
          </div>
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-elegant">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Smart Filtering
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Powerful search and filtering capabilities to quickly locate
              required data
            </p>
          </div>
        </div>
      </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default HomePage;
