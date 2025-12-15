"use client";

import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { Eye, EyeOff } from "lucide-react";
import { LoginAccount } from "@/types";

interface LoginAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { username: string; password: string; email: string; role: 'admin' | 'user' }) => Promise<void>;
  account?: LoginAccount | null;
}

const LoginAccountModal: React.FC<LoginAccountModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  account,
}) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    role: "user" as "admin" | "user",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (account) {
      setFormData({
        username: account.username,
        password: "",
        email: account.email,
        role: account.role,
      });
    } else {
      setFormData({
        username: "",
        password: "",
        email: "",
        role: "user",
      });
    }
    setError("");
    setShowPassword(false);
  }, [account, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!formData.username || !formData.email) {
        setError("Username and email are required");
        setLoading(false);
        return;
      }

      if (!account && !formData.password) {
        setError("Password is required for new accounts");
        setLoading(false);
        return;
      }

      await onSubmit({
        username: formData.username,
        password: formData.password,
        email: formData.email,
        role: formData.role,
      });
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to save account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={account ? "Edit Login Account" : "Add New Login Account"}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Username *
          </label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            className="input w-full"
            placeholder="Enter username"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Password {account && "(leave empty to keep current)"}
            {!account && "*"}
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="input w-full pr-10"
              placeholder="Enter password"
              required={!account}
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="input w-full"
            placeholder="Enter email"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Role *
          </label>
          <select
            value={formData.role}
            onChange={(e) =>
              setFormData({
                ...formData,
                role: e.target.value as "admin" | "user",
              })
            }
            className="input w-full"
            required
            disabled={loading}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary"
            disabled={loading}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Saving..." : account ? "Update" : "Create"} Account
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default LoginAccountModal;

