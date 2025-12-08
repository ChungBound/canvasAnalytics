"use client";

import React from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import StatsCards from "@/components/StatsCards";
import Charts from "@/components/Charts";
import { getDashboardStats, getChartData } from "@/data/mockData";
import { Table } from "lucide-react";

const ReportPage: React.FC = () => {
  const stats = getDashboardStats();
  const chartData = getChartData();

  return (
    <Layout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Canvas Discussion Analytics
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
          Comprehensive analysis and reporting of university Canvas discussion
          data
        </p>
      </div>

      {/* Statistics Cards */}
      <StatsCards stats={stats} />

      {/* Charts */}
      <Charts data={chartData} />

      {/* Link to Table Page */}
      <div className="card p-6 text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <Table className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              View Detailed Data Table
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Browse and filter discussion data, support viewing by level (Topic, Post, Reply)
            </p>
            <Link
              href="/table"
              className="btn btn-primary inline-flex items-center space-x-2"
            >
              <Table className="w-4 h-4" />
              <span>Go to Data Table</span>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReportPage;
