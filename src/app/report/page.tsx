"use client";

import React, { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import StatsCards from "@/components/StatsCards";
import Charts from "@/components/Charts";
import SearchFilter from "@/components/SearchFilter";
import DataTable from "@/components/DataTable";
import DetailModal from "@/components/DetailModal";
import { useLoading } from "@/contexts/LoadingContext";
import {
  getDashboardStats,
  getChartData,
  mockDiscussionData,
} from "@/data/mockData";
import { DiscussionItem, FilterOptions, SortOptions } from "@/types";

const ReportPage: React.FC = () => {
  const stats = getDashboardStats();
  const chartData = getChartData();
  const { setLoading } = useLoading();

  const [selectedItem, setSelectedItem] = useState<DiscussionItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [sort, setSort] = useState<SortOptions>({
    field: "createdAt",
    order: "desc",
  });
  const [searchTerm, setSearchTerm] = useState("");

  // Filter and sort data - use all data, not limited by level
  const filteredAndSortedData = useMemo(() => {
    let result = [...mockDiscussionData];

    // Apply search
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

    // Apply filters (联查 - all filters combined)
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

    // Apply sorting
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

  // Simulate API call
  const simulateApiCall = async () => {
    setLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLoading(false);
  };

  // Handle chart clicks (一级筛选 - clear other filters, only keep current filter)
  const handlePriorityClick = async (priority: string) => {
    setLoading(true);
    // Simulate API call
    await simulateApiCall();
    setFilters({
      priority: priority as "low" | "medium" | "high",
    });
    setSearchTerm("");
  };

  const handleTypeClick = async (type: string) => {
    setLoading(true);
    // Simulate API call
    await simulateApiCall();
    setFilters({
      type: type as "lecture" | "workshop" | "assignment",
    });
    setSearchTerm("");
  };

  const handleSentimentClick = async (sentiment: string) => {
    setLoading(true);
    // Simulate API call
    await simulateApiCall();
    setFilters({
      sentiment: sentiment as
        | "ACADEMIC_DESPERATION"
        | "PRODUCTIVE_STRUGGLE"
        | "CONFUSION"
        | "TECHNOSTRESS"
        | "BOREDOM"
        | "HOSTILITY"
        | "EPISTEMIC_CURIOSITY",
    });
    setSearchTerm("");
  };

  // Handle card clicks (level filter - clear other filters)
  const handleCardClick = async (level: "topic" | "post" | "reply") => {
    setLoading(true);
    // Simulate API call
    await simulateApiCall();
    setFilters({ level });
    setSearchTerm("");
  };

  return (
    <ProtectedRoute>
      <Layout>
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            LMS EarlySense
          </h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
            Comprehensive analysis and reporting system for university Canvas
            discussion data with advanced insights and visualizations
          </p>
        </div>

        {/* Statistics Cards */}
        <StatsCards stats={stats} onCardClick={handleCardClick} />

        {/* Charts */}
        <Charts
          data={chartData}
          onPriorityClick={handlePriorityClick}
          onTypeClick={handleTypeClick}
          onSentimentClick={handleSentimentClick}
        />

        {/* Search and Filter */}
        <div className="mt-8">
          <SearchFilter
            filters={filters}
            sort={sort}
            searchTerm={searchTerm}
            onFilterChange={setFilters}
            onSortChange={setSort}
            onSearch={setSearchTerm}
          />
        </div>

        {/* Data Table */}
        <div className="mt-6">
          <DataTable
            items={filteredAndSortedData}
            onViewDetail={handleViewDetail}
            currentLevel={undefined}
          />
        </div>

        {/* Detail Modal */}
        <DetailModal
          item={selectedItem}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </Layout>
    </ProtectedRoute>
  );
};

export default ReportPage;
