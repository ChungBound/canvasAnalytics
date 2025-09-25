"use client";

import React, { useState } from "react";
import { Search, Filter, X, SortAsc, SortDesc } from "lucide-react";
import { FilterOptions, SortOptions } from "@/types";

interface SearchFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
  onSortChange: (sort: SortOptions) => void;
  onSearch: (searchTerm: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  onFilterChange,
  onSortChange,
  onSearch,
}) => {
  const [filters, setFilters] = useState<FilterOptions>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState<SortOptions>({
    field: "createdAt",
    order: "desc",
  });

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value || undefined };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (
    field: SortOptions["field"],
    order: SortOptions["order"]
  ) => {
    const newSort = { field, order };
    setSort(newSort);
    onSortChange(newSort);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const clearFilters = () => {
    setFilters({});
    onFilterChange({});
    setSearchTerm("");
    onSearch("");
  };

  const hasActiveFilters =
    Object.values(filters).some((value) => value) || searchTerm;

  return (
    <div className="card p-6">
      {/* Search Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by ID, author, or content..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="input pl-10 h-12 text-base"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn ${
              showFilters ? "btn-primary" : "btn-secondary"
            } h-12 px-6`}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>

          {hasActiveFilters && (
            <button onClick={clearFilters} className="btn btn-danger h-12 px-6">
              <X className="w-4 h-4 mr-2" />
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Sort Options */}
      <div className="flex flex-wrap items-center gap-4 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Sort by:
        </span>
        <div className="flex gap-2">
          {[
            {
              field: "createdAt",
              order: "desc",
              label: "Newest First",
              icon: SortDesc,
            },
            {
              field: "createdAt",
              order: "asc",
              label: "Oldest First",
              icon: SortAsc,
            },
            {
              field: "replyCount",
              order: "desc",
              label: "Most Replies",
              icon: SortDesc,
            },
            {
              field: "replyCount",
              order: "asc",
              label: "Least Replies",
              icon: SortAsc,
            },
          ].map((option) => {
            const Icon = option.icon;
            const isActive =
              sort.field === option.field && sort.order === option.order;
            return (
              <button
                key={`${option.field}-${option.order}`}
                onClick={() =>
                  handleSortChange(
                    option.field as SortOptions["field"],
                    option.order as SortOptions["order"]
                  )
                }
                className={`btn ${
                  isActive ? "btn-primary" : "btn-secondary"
                } text-sm`}
              >
                <Icon className="w-4 h-4 mr-1" />
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Priority
            </label>
            <select
              value={filters.priority || ""}
              onChange={(e) => handleFilterChange("priority", e.target.value)}
              className="select"
            >
              <option value="">All Priorities</option>
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Type
            </label>
            <select
              value={filters.type || ""}
              onChange={(e) => handleFilterChange("type", e.target.value)}
              className="select"
            >
              <option value="">All Types</option>
              <option value="lecture">Lecture</option>
              <option value="workshop">Workshop</option>
              <option value="assignment">Assignment</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sentiment
            </label>
            <select
              value={filters.sentiment || ""}
              onChange={(e) => handleFilterChange("sentiment", e.target.value)}
              className="select"
            >
              <option value="">All Sentiments</option>
              <option value="positive">Positive</option>
              <option value="negative">Negative</option>
              <option value="neutral">Neutral</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Level
            </label>
            <select
              value={filters.level || ""}
              onChange={(e) => handleFilterChange("level", e.target.value)}
              className="select"
            >
              <option value="">All Levels</option>
              <option value="topic">Topic</option>
              <option value="post">Post</option>
              <option value="reply">Reply</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
