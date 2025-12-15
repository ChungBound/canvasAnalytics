"use client";

import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import LoginAccountModal from "@/components/LoginAccountModal";
import EmailNotificationModal from "@/components/EmailNotificationModal";
import LoadingOverlay from "@/components/LoadingOverlay";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  User,
  Mail,
  Calendar,
  Lock,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import {
  mockGetLoginAccounts,
  mockCreateLoginAccount,
  mockUpdateLoginAccount,
  mockDeleteLoginAccount,
  mockGetEmailNotifications,
  mockUpdateEmailNotification,
  mockToggleEmailNotification,
} from "@/services/authService";
import { LoginAccount, EmailNotification } from "@/types";

type TabType = "login" | "email";

const ConfigPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("login");
  const [loading, setLoading] = useState(true);
  
  // Login Account Management State
  const [loginAccounts, setLoginAccounts] = useState<LoginAccount[]>([]);
  const [loginSearchTerm, setLoginSearchTerm] = useState("");
  const [showLoginAccountModal, setShowLoginAccountModal] = useState(false);
  const [editingLoginAccount, setEditingLoginAccount] = useState<LoginAccount | null>(null);
  
  // Email Notification Management State
  const [emailNotifications, setEmailNotifications] = useState<EmailNotification[]>([]);
  const [emailSearchTerm, setEmailSearchTerm] = useState("");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [editingEmailNotification, setEditingEmailNotification] = useState<EmailNotification | null>(null);
  const [togglingEmailIds, setTogglingEmailIds] = useState<Set<string>>(new Set());

  // Load data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          loadLoginAccounts(),
          loadEmailNotifications(),
        ]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const loadLoginAccounts = async () => {
    try {
      const accounts = await mockGetLoginAccounts();
      setLoginAccounts(accounts);
    } catch (error) {
      console.error("Error loading login accounts:", error);
    }
  };

  const loadEmailNotifications = async () => {
    try {
      const notifications = await mockGetEmailNotifications();
      setEmailNotifications(notifications);
    } catch (error) {
      console.error("Error loading email notifications:", error);
    }
  };

  // Format date (Australian format)
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-AU", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Login Account Management Functions
  const filteredLoginAccounts = loginAccounts.filter(
    (account) =>
      account.username.toLowerCase().includes(loginSearchTerm.toLowerCase()) ||
      account.email.toLowerCase().includes(loginSearchTerm.toLowerCase())
  );

  const handleAddLoginAccount = async (data: {
    username: string;
    password: string;
    email: string;
    role: "admin" | "user";
  }) => {
    await mockCreateLoginAccount(data);
    await loadLoginAccounts();
    await loadEmailNotifications();
  };

  const handleUpdateLoginAccount = async (data: {
    username: string;
    password: string;
    email: string;
    role: "admin" | "user";
  }) => {
    if (!editingLoginAccount) return;
    await mockUpdateLoginAccount(editingLoginAccount.id, {
      username: data.username,
      ...(data.password && { password: data.password }),
      email: data.email,
      role: data.role,
    });
    await loadLoginAccounts();
    await loadEmailNotifications();
  };

  const handleDeleteLoginAccount = async (id: string) => {
    if (confirm("Are you sure you want to delete this login account?")) {
      try {
        await mockDeleteLoginAccount(id);
        await loadLoginAccounts();
        await loadEmailNotifications();
      } catch (error: any) {
        alert(error.message || "Failed to delete login account");
      }
    }
  };

  const handleOpenLoginAccountModal = (account?: LoginAccount) => {
    setEditingLoginAccount(account || null);
    setShowLoginAccountModal(true);
  };

  const handleCloseLoginAccountModal = () => {
    setShowLoginAccountModal(false);
    setEditingLoginAccount(null);
  };

  // Email Notification Management Functions
  const filteredEmailNotifications = emailNotifications.filter((notif) => {
    const account = loginAccounts.find((acc) => acc.id === notif.loginAccountId);
    return (
      notif.email.toLowerCase().includes(emailSearchTerm.toLowerCase()) ||
      account?.username.toLowerCase().includes(emailSearchTerm.toLowerCase())
    );
  });

  const handleUpdateEmail = async (email: string) => {
    if (!editingEmailNotification) return;
    await mockUpdateEmailNotification(editingEmailNotification.loginAccountId, email);
    await loadEmailNotifications();
  };

  const handleToggleEmail = async (loginAccountId: string) => {
    if (togglingEmailIds.has(loginAccountId)) return;
    
    setTogglingEmailIds((prev) => new Set(prev).add(loginAccountId));
    try {
      await mockToggleEmailNotification(loginAccountId);
      await loadEmailNotifications();
    } catch (error: any) {
      alert(error.message || "Failed to toggle email notification");
    } finally {
      setTogglingEmailIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(loginAccountId);
        return newSet;
      });
    }
  };

  const handleOpenEmailModal = (notification: EmailNotification) => {
    setEditingEmailNotification(notification);
    setShowEmailModal(true);
  };

  const handleCloseEmailModal = () => {
    setShowEmailModal(false);
    setEditingEmailNotification(null);
  };

  const getAccountUsername = (accountId: string) => {
    const account = loginAccounts.find((acc) => acc.id === accountId);
    return account?.username || "Unknown";
  };

  return (
    <ProtectedRoute requireAdmin>
      <Layout>
        <LoadingOverlay isLoading={loading} />
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            System Configuration
          </h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
            Manage system settings and administrator accounts
          </p>
        </div>

        {/* Administrator Management */}
        <div className="card p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Administrator Management
          </h2>

          {/* Tabs */}
          <div className="flex space-x-2 mb-6 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab("login")}
              className={`px-6 py-3 font-medium transition-all duration-200 border-b-2 ${
                activeTab === "login"
                  ? "border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                  : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              Login Account Management
            </button>
            <button
              onClick={() => setActiveTab("email")}
              className={`px-6 py-3 font-medium transition-all duration-200 border-b-2 ${
                activeTab === "email"
                  ? "border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                  : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              Email Notification Management
            </button>
          </div>

          {/* Login Account Management Tab */}
          {activeTab === "login" && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <p className="text-gray-600 dark:text-gray-400">
                  Manage login accounts with username and password
                </p>
                <button
                  onClick={() => handleOpenLoginAccountModal()}
                  className="btn btn-primary"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Login Account
                </button>
              </div>

              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by username or email..."
                    value={loginSearchTerm}
                    onChange={(e) => setLoginSearchTerm(e.target.value)}
                    className="input pl-10"
                  />
                </div>
              </div>

              {/* Login Accounts List */}
              <div className="space-y-4">
                {filteredLoginAccounts.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-lg text-gray-500 dark:text-gray-400">
                      {loginSearchTerm
                        ? "No login accounts found matching your search"
                        : "No login accounts added yet"}
                    </p>
                  </div>
                ) : (
                  filteredLoginAccounts.map((account) => (
                    <div
                      key={account.id}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-elegant transition-all duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Lock className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            {account.username}
                          </h3>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center space-x-1">
                              <Mail className="w-4 h-4" />
                              <span>{account.email}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <User className="w-4 h-4" />
                              <span className="capitalize">{account.role}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>Created {formatDate(account.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleOpenLoginAccountModal(account)}
                          className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                          title="Edit Login Account"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteLoginAccount(account.id)}
                          className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Delete Login Account"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {/* Email Notification Management Tab */}
          {activeTab === "email" && (
            <>
              <div className="mb-6">
                <p className="text-gray-600 dark:text-gray-400">
                  Manage email notification addresses and enable/disable notifications for each login account
                </p>
              </div>

              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by account username or email..."
                    value={emailSearchTerm}
                    onChange={(e) => setEmailSearchTerm(e.target.value)}
                    className="input pl-10"
                  />
                </div>
              </div>

              {/* Email Notifications List */}
              <div className="space-y-4">
                {filteredEmailNotifications.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-lg text-gray-500 dark:text-gray-400">
                      {emailSearchTerm
                        ? "No email notifications found matching your search"
                        : "No email notifications configured yet"}
                    </p>
                  </div>
                ) : (
                  filteredEmailNotifications.map((notification) => {
                    const isToggling = togglingEmailIds.has(notification.loginAccountId);
                    return (
                      <div
                        key={notification.id}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 bg-gradient-to-r from-gray-50 to-green-50 dark:from-gray-800 dark:to-green-900/20 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-elegant transition-all duration-200"
                      >
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <Mail className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                              {getAccountUsername(notification.loginAccountId)}
                            </h3>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-500 dark:text-gray-400">
                              <div className="flex items-center space-x-1">
                                <Mail className="w-4 h-4" />
                                <span>{notification.email}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>Created {formatDate(notification.createdAt)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleToggleEmail(notification.loginAccountId)}
                            disabled={isToggling}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                              notification.enabled
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                            } ${isToggling ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"}`}
                            title={notification.enabled ? "Disable email notifications" : "Enable email notifications"}
                          >
                            {notification.enabled ? (
                              <ToggleRight className="w-5 h-5" />
                            ) : (
                              <ToggleLeft className="w-5 h-5" />
                            )}
                            <span className="text-sm font-medium">
                              {notification.enabled ? "Enabled" : "Disabled"}
                            </span>
                          </button>
                          <button
                            onClick={() => handleOpenEmailModal(notification)}
                            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                            title="Edit Email Notification"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </>
          )}
        </div>

        {/* System Information */}
        <div className="card p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            System Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/30 rounded-xl">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                System Version
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">v1.0.0</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/30 rounded-xl">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Total Login Accounts
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {loginAccounts.length}
              </p>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/30 rounded-xl">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Email Notifications
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {emailNotifications.length}
              </p>
            </div>
          </div>
        </div>

        {/* Modals */}
        <LoginAccountModal
          isOpen={showLoginAccountModal}
          onClose={handleCloseLoginAccountModal}
          onSubmit={editingLoginAccount ? handleUpdateLoginAccount : handleAddLoginAccount}
          account={editingLoginAccount}
        />

        <EmailNotificationModal
          isOpen={showEmailModal}
          onClose={handleCloseEmailModal}
          onSubmit={handleUpdateEmail}
          notification={editingEmailNotification}
        />
      </Layout>
    </ProtectedRoute>
  );
};

export default ConfigPage;
