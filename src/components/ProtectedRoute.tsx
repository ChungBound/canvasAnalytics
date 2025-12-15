"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import LoadingOverlay from "./LoadingOverlay";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, loading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    } else if (!loading && isAuthenticated && requireAdmin && !isAdmin()) {
      router.push("/");
    }
  }, [isAuthenticated, loading, requireAdmin, isAdmin, router]);

  if (!isAuthenticated && !loading) {
    return null;
  }

  if (requireAdmin && !isAdmin() && !loading) {
    return null;
  }

  return (
    <>
      {children}
      <LoadingOverlay isLoading={loading} />
    </>
  );
};

export default ProtectedRoute;

