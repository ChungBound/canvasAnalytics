"use client";

import React from "react";

interface LoadingOverlayProps {
  isLoading: boolean;
  text?: string;
  zIndex?: number;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  text = "Loading...",
  zIndex = 50,
}) => {
  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      style={{ zIndex }}
    >
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-100 dark:text-gray-200 font-medium">{text}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;

