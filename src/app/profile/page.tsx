"use client";

import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import UserProfileModal from "@/components/UserProfileModal";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useAuth } from "@/contexts/AuthContext";
import {
  User,
  Mail,
  Calendar,
  Edit,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import {
  mockGetCurrentUser,
  mockUpdateCurrentUser,
  mockGetEmailNotifications,
  mockToggleEmailNotification,
} from "@/services/authService";
import { LoginAccount, EmailNotification } from "@/types";

const ProfilePage: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const [account, setAccount] = useState<LoginAccount | null>(null);
  const [emailNotification, setEmailNotification] = useState<EmailNotification | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [togglingEmail, setTogglingEmail] = useState(false);

  useEffect(() => {
    loadUserData();
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const accountData = await mockGetCurrentUser(user.id);
      if (accountData) {
        setAccount(accountData);
      }

      const notifications = await mockGetEmailNotifications();
      const userNotification = notifications.find(
        (notif) => notif.loginAccountId === user.id
      );
      setEmailNotification(userNotification || null);
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (data: {
    username: string;
    password: string;
    email: string;
  }) => {
    if (!user) return;

    await mockUpdateCurrentUser(user.id, {
      username: data.username,
      ...(data.password && { password: data.password }),
      email: data.email,
    });
    await refreshUser();
    await loadUserData();
  };

  const handleToggleEmail = async () => {
    if (!user || !emailNotification || togglingEmail) return;

    setTogglingEmail(true);
    try {
      await mockToggleEmailNotification(user.id);
      await loadUserData();
    } catch (error) {
      console.error("Error toggling email notification:", error);
      alert("Failed to toggle email notification");
    } finally {
      setTogglingEmail(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-AU", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <ProtectedRoute>
      <Layout>
        <LoadingOverlay isLoading={loading} />
        
        {/* Page Header - Always render to maintain layout */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            My Profile
          </h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
            Manage your account information and preferences
          </p>
        </div>

        {/* Profile Information Card - Always render to maintain layout */}
        <div className={`card p-6 mb-8 ${loading && !account ? 'opacity-50 pointer-events-none' : ''}`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Account Information
            </h2>
            <button
              onClick={() => setShowEditModal(true)}
              className="btn btn-primary"
              disabled={loading || !account}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Username
                    </label>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {loading && !account ? "..." : account?.username || "—"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Email Address
                    </label>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {loading && !account ? "..." : account?.email || "—"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Role
                    </label>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                      {loading && !account ? "..." : account?.role || "—"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Account Created
                    </label>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {loading && !account ? "..." : account ? formatDate(account.createdAt) : "—"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Email Notification Settings - Always render to maintain layout */}
        <div className={`card p-6 ${loading && !account ? 'opacity-50 pointer-events-none' : ''}`}>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Email Notification Settings
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-green-50 dark:from-gray-800 dark:to-green-900/20 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    Email Notifications
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {loading && !account ? "..." : emailNotification?.email || account?.email || "—"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {loading && !account 
                      ? "Loading..." 
                      : emailNotification?.enabled
                        ? "You will receive email notifications"
                        : "Email notifications are disabled"}
                  </p>
                </div>
              </div>
              <button
                onClick={handleToggleEmail}
                disabled={togglingEmail || !emailNotification || loading || !account}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  emailNotification?.enabled
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                } ${togglingEmail || loading || !account ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"}`}
              >
                {emailNotification?.enabled ? (
                  <ToggleRight className="w-6 h-6" />
                ) : (
                  <ToggleLeft className="w-6 h-6" />
                )}
                <span className="text-sm font-medium">
                  {emailNotification?.enabled ? "Enabled" : "Disabled"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Error message */}
        {!account && !loading && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500 dark:text-gray-400">
              Failed to load profile data
            </p>
          </div>
        )}

        {/* Edit Profile Modal */}
        {showEditModal && account && (
          <UserProfileModal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            onSubmit={handleUpdateProfile}
            account={account}
          />
        )}
      </Layout>
    </ProtectedRoute>
  );
};

export default ProfilePage;

