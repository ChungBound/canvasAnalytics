"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import SearchFilter from "@/components/SearchFilter";
import DataTable from "@/components/DataTable";
import DetailModal from "@/components/DetailModal";
import { mockDiscussionData } from "@/data/mockData";
import { DiscussionItem, FilterOptions, SortOptions } from "@/types";
import { ArrowLeft } from "lucide-react";

const PostTablePage: React.FC = () => {
  const params = useParams();
  const topicId = params.topicId as string;

  const [selectedItem, setSelectedItem] = useState<DiscussionItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [sort, setSort] = useState<SortOptions>({
    field: "createdAt",
    order: "desc",
  });
  const [searchTerm, setSearchTerm] = useState("");

  // Get current topic information
  const currentTopic = useMemo(() => {
    return mockDiscussionData.find(
      (item) => item.id === topicId && item.level === "topic"
    );
  }, [topicId]);

  // Filter post level data
  const postData = useMemo(() => {
    return mockDiscussionData.filter(
      (item) => item.level === "post" && item.parentId === topicId
    );
  }, [topicId]);

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let result = [...postData];

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

    // Apply filters
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
  }, [postData, filters, sort, searchTerm]);

  const handleViewDetail = (item: DiscussionItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <ProtectedRoute>
      <Layout>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link
            href="/table"
            className="btn btn-secondary btn-sm flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Topic Level</span>
          </Link>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Data Table - Post Level
        </h1>
        {currentTopic && (
          <div className="mt-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Current Topic:
            </p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {currentTopic.title}
            </p>
          </div>
        )}
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
          View and filter post data under this topic, click "Next Level" button to view replies under this post
        </p>
      </div>

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
        currentLevel="post"
        topicId={topicId}
      />

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

export default PostTablePage;

