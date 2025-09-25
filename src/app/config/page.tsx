"use client";

import React, { useState } from "react";
import Layout from "@/components/Layout";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Sun,
  Moon,
  User,
  Mail,
  Calendar,
} from "lucide-react";
import { mockAdminData } from "@/data/mockData";
import { Admin } from "@/types";

const ConfigPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [admins, setAdmins] = useState<Admin[]>(mockAdminData);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "" });

  // Filter admin list
  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAdmin = () => {
    if (formData.name && formData.email) {
      const newAdmin: Admin = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        createdAt: new Date().toISOString(),
      };
      setAdmins([...admins, newAdmin]);
      setFormData({ name: "", email: "" });
      setShowAddForm(false);
    }
  };

  const handleEditAdmin = (admin: Admin) => {
    setEditingAdmin(admin);
    setFormData({ name: admin.name, email: admin.email });
    setShowAddForm(true);
  };

  const handleUpdateAdmin = () => {
    if (editingAdmin && formData.name && formData.email) {
      setAdmins(
        admins.map((admin) =>
          admin.id === editingAdmin.id
            ? { ...admin, name: formData.name, email: formData.email }
            : admin
        )
      );
      setEditingAdmin(null);
      setFormData({ name: "", email: "" });
      setShowAddForm(false);
    }
  };

  const handleDeleteAdmin = (id: string) => {
    if (confirm("Are you sure you want to delete this administrator?")) {
      setAdmins(admins.filter((admin) => admin.id !== id));
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingAdmin(null);
    setFormData({ name: "", email: "" });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Layout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          System Configuration
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
          Manage system settings and administrator accounts
        </p>
      </div>

      {/* Theme Settings Card */}
      <div className="card p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Interface Theme
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
              Choose your preferred interface theme
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Current theme: {theme === "light" ? "Light Mode" : "Dark Mode"}
            </p>
          </div>
          <button onClick={toggleTheme} className="btn btn-primary px-6 py-3">
            {theme === "light" ? (
              <>
                <Moon className="w-5 h-5 mr-2" />
                Switch to Dark Mode
              </>
            ) : (
              <>
                <Sun className="w-5 h-5 mr-2" />
                Switch to Light Mode
              </>
            )}
          </button>
        </div>
      </div>

      {/* Administrator Management */}
      <div className="card p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Administrator Management
          </h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn btn-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Administrator
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {editingAdmin ? "Edit Administrator" : "Add New Administrator"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="input"
                  placeholder="Enter administrator name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="input"
                  placeholder="Enter administrator email"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button onClick={handleCancel} className="btn btn-secondary">
                Cancel
              </button>
              <button
                onClick={editingAdmin ? handleUpdateAdmin : handleAddAdmin}
                className="btn btn-primary"
              >
                {editingAdmin ? "Update" : "Add"} Administrator
              </button>
            </div>
          </div>
        )}

        {/* Administrator List */}
        <div className="space-y-4">
          {filteredAdmins.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                {searchTerm
                  ? "No administrators found matching your search"
                  : "No administrators added yet"}
              </p>
            </div>
          ) : (
            filteredAdmins.map((admin) => (
              <div
                key={admin.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-elegant transition-all duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {admin.name}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Mail className="w-4 h-4" />
                        <span>{admin.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Created {formatDate(admin.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditAdmin(admin)}
                    className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    title="Edit Administrator"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteAdmin(admin.id)}
                    className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Delete Administrator"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* System Information */}
      <div className="card p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          System Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/30 rounded-xl">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              System Version
            </p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              v1.0.0
            </p>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/30 rounded-xl">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              Total Administrators
            </p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {admins.length}
            </p>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/30 rounded-xl">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              Last Updated
            </p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {formatDate(new Date().toISOString()).split(",")[0]}
            </p>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/30 rounded-xl">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              Current Theme
            </p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {theme === "light" ? "Light Mode" : "Dark Mode"}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ConfigPage;
