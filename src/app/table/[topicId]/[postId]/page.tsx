"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Layout from "@/components/Layout";
import SearchFilter from "@/components/SearchFilter";
import DataTable from "@/components/DataTable";
import DetailModal from "@/components/DetailModal";
import { mockDiscussionData } from "@/data/mockData";
import { DiscussionItem, FilterOptions, SortOptions } from "@/types";
import { ArrowLeft } from "lucide-react";

const ReplyTablePage: React.FC = () => {
  const params = useParams();
  const topicId = params.topicId as string;
  const postId = params.postId as string;

  const [selectedItem, setSelectedItem] = useState<DiscussionItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [sort, setSort] = useState<SortOptions>({
    field: "createdAt",
    order: "desc",
  });
  const [searchTerm, setSearchTerm] = useState("");

  // Get current topic and post information
  const currentTopic = useMemo(() => {
    return mockDiscussionData.find(
      (item) => item.id === topicId && item.level === "topic"
    );
  }, [topicId]);

  const currentPost = useMemo(() => {
    return mockDiscussionData.find(
      (item) => item.id === postId && item.level === "post"
    );
  }, [postId]);

  // Filter reply level data
  const replyData = useMemo(() => {
    return mockDiscussionData.filter(
      (item) => item.level === "reply" && item.parentId === postId
    );
  }, [postId]);

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let result = [...replyData];

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
  }, [replyData, filters, sort, searchTerm]);

  const handleViewDetail = (item: DiscussionItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <Layout>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link
            href={`/table/${topicId}`}
            className="btn btn-secondary btn-sm flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Post Level</span>
          </Link>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Data Table - Reply Level
        </h1>
        {(currentTopic || currentPost) && (
          <div className="mt-3 space-y-2">
            {currentTopic && (
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Current Topic:
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {currentTopic.title}
                </p>
              </div>
            )}
            {currentPost && (
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Current Post:
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {currentPost.title}
                </p>
              </div>
            )}
          </div>
        )}
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
          View and filter reply data under this post (reached the bottom level)
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
        currentLevel="reply"
        topicId={topicId}
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

export default ReplyTablePage;

