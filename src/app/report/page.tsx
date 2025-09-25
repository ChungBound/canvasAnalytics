"use client";

import React, { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import StatsCards from "@/components/StatsCards";
import Charts from "@/components/Charts";
import SearchFilter from "@/components/SearchFilter";
import DataTable from "@/components/DataTable";
import DetailModal from "@/components/DetailModal";
import {
  mockDiscussionData,
  getDashboardStats,
  getChartData,
} from "@/data/mockData";
import { DiscussionItem, FilterOptions, SortOptions } from "@/types";

const ReportPage: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<DiscussionItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [sort, setSort] = useState<SortOptions>({
    field: "createdAt",
    order: "desc",
  });
  const [searchTerm, setSearchTerm] = useState("");

  // 过滤和排序数据
  const filteredAndSortedData = useMemo(() => {
    let result = [...mockDiscussionData];

    // 应用搜索
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.id.toLowerCase().includes(term) ||
          item.title.toLowerCase().includes(term) ||
          item.content.toLowerCase().includes(term) ||
          item.author.toLowerCase().includes(term)
      );
    }

    // 应用筛选
    if (filters.priority) {
      result = result.filter((item) => item.priority === filters.priority);
    }
    if (filters.type) {
      result = result.filter((item) => item.type === filters.type);
    }
    if (filters.sentiment) {
      result = result.filter((item) => item.sentiment === filters.sentiment);
    }
    if (filters.level) {
      result = result.filter((item) => item.level === filters.level);
    }
    if (filters.author) {
      result = result.filter((item) =>
        item.author.toLowerCase().includes(filters.author!.toLowerCase())
      );
    }
    if (filters.id) {
      result = result.filter((item) =>
        item.id.toLowerCase().includes(filters.id!.toLowerCase())
      );
    }

    // 应用排序
    result.sort((a, b) => {
      let aValue, bValue;

      if (sort.field === "createdAt") {
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
      } else {
        aValue = a.replyCount;
        bValue = b.replyCount;
      }

      if (sort.order === "asc") {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });

    return result;
  }, [filters, sort, searchTerm]);

  const handleViewDetail = (item: DiscussionItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

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

      {/* Search and Filter */}
      <SearchFilter
        onFilterChange={setFilters}
        onSortChange={setSort}
        onSearch={setSearchTerm}
      />

      {/* Data Table */}
      <DataTable
        items={filteredAndSortedData}
        onViewDetail={handleViewDetail}
      />

      {/* Detail Modal */}
      <DetailModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </Layout>
  );
};

export default ReportPage;
