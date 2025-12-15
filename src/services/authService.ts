import { LoginAccount, EmailNotification, AuthUser } from '@/types';
import { mockLoginAccounts, mockEmailNotifications } from '@/data/mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Login API
export const mockLogin = async (username: string, password: string): Promise<{ success: boolean; user?: AuthUser; error?: string }> => {
  await delay(500); // Simulate network delay
  
  const account = mockLoginAccounts.find(
    acc => acc.username === username && acc.password === password
  );
  
  if (account) {
    return {
      success: true,
      user: {
        id: account.id,
        username: account.username,
        email: account.email,
        role: account.role,
      },
    };
  }
  
  return {
    success: false,
    error: 'Invalid username or password',
  };
};

// Get all login accounts
export const mockGetLoginAccounts = async (): Promise<LoginAccount[]> => {
  await delay(300);
  return [...mockLoginAccounts];
};

// Create login account
export const mockCreateLoginAccount = async (data: { username: string; password: string; email: string; role?: 'admin' | 'user' }): Promise<LoginAccount> => {
  await delay(400);
  
  // Check if username already exists
  if (mockLoginAccounts.some(acc => acc.username === data.username)) {
    throw new Error('Username already exists');
  }
  
  const newAccount: LoginAccount = {
    id: Date.now().toString(),
    username: data.username,
    password: data.password,
    email: data.email,
    role: data.role || 'user',
    createdAt: new Date().toISOString(),
  };
  
  mockLoginAccounts.push(newAccount);
  
  // Create default email notification entry
  const newNotification: EmailNotification = {
    id: `notif-${Date.now()}`,
    loginAccountId: newAccount.id,
    email: data.email,
    enabled: true,
    createdAt: new Date().toISOString(),
  };
  
  mockEmailNotifications.push(newNotification);
  
  return newAccount;
};

// Update login account
export const mockUpdateLoginAccount = async (id: string, data: { username?: string; password?: string; email?: string; role?: 'admin' | 'user' }): Promise<LoginAccount> => {
  await delay(400);
  
  const accountIndex = mockLoginAccounts.findIndex(acc => acc.id === id);
  if (accountIndex === -1) {
    throw new Error('Account not found');
  }
  
  // Check if username already exists (if changing username)
  if (data.username && data.username !== mockLoginAccounts[accountIndex].username) {
    if (mockLoginAccounts.some(acc => acc.username === data.username && acc.id !== id)) {
      throw new Error('Username already exists');
    }
  }
  
  const updatedAccount: LoginAccount = {
    ...mockLoginAccounts[accountIndex],
    ...(data.username && { username: data.username }),
    ...(data.password && { password: data.password }),
    ...(data.email && { email: data.email }),
    ...(data.role && { role: data.role }),
  };
  
  mockLoginAccounts[accountIndex] = updatedAccount;
  
  return updatedAccount;
};

// Delete login account
export const mockDeleteLoginAccount = async (id: string): Promise<void> => {
  await delay(300);
  
  const accountIndex = mockLoginAccounts.findIndex(acc => acc.id === id);
  if (accountIndex === -1) {
    throw new Error('Account not found');
  }
  
  mockLoginAccounts.splice(accountIndex, 1);
  
  // Also delete associated email notification
  const notificationIndex = mockEmailNotifications.findIndex(notif => notif.loginAccountId === id);
  if (notificationIndex !== -1) {
    mockEmailNotifications.splice(notificationIndex, 1);
  }
};

// Get email notifications
export const mockGetEmailNotifications = async (): Promise<EmailNotification[]> => {
  await delay(300);
  return [...mockEmailNotifications];
};

// Update email notification
export const mockUpdateEmailNotification = async (loginAccountId: string, email: string, enabled?: boolean): Promise<EmailNotification> => {
  await delay(400);
  
  const notificationIndex = mockEmailNotifications.findIndex(notif => notif.loginAccountId === loginAccountId);
  
  if (notificationIndex === -1) {
    // Create new notification if doesn't exist
    const newNotification: EmailNotification = {
      id: `notif-${Date.now()}`,
      loginAccountId,
      email,
      enabled: enabled !== undefined ? enabled : true,
      createdAt: new Date().toISOString(),
    };
    mockEmailNotifications.push(newNotification);
    return newNotification;
  }
  
  const updatedNotification: EmailNotification = {
    ...mockEmailNotifications[notificationIndex],
    email,
    ...(enabled !== undefined && { enabled }),
  };
  
  mockEmailNotifications[notificationIndex] = updatedNotification;
  return updatedNotification;
};

// Toggle email notification enabled status
export const mockToggleEmailNotification = async (loginAccountId: string): Promise<EmailNotification> => {
  await delay(300);
  
  const notificationIndex = mockEmailNotifications.findIndex(notif => notif.loginAccountId === loginAccountId);
  
  if (notificationIndex === -1) {
    throw new Error('Email notification not found');
  }
  
  const updatedNotification: EmailNotification = {
    ...mockEmailNotifications[notificationIndex],
    enabled: !mockEmailNotifications[notificationIndex].enabled,
  };
  
  mockEmailNotifications[notificationIndex] = updatedNotification;
  return updatedNotification;
};

// Get current user full information
export const mockGetCurrentUser = async (userId: string): Promise<LoginAccount | null> => {
  await delay(200);
  const account = mockLoginAccounts.find(acc => acc.id === userId);
  return account ? { ...account } : null;
};

// Update current user information
export const mockUpdateCurrentUser = async (userId: string, data: { username?: string; password?: string; email?: string }): Promise<LoginAccount> => {
  await delay(400);
  
  const accountIndex = mockLoginAccounts.findIndex(acc => acc.id === userId);
  if (accountIndex === -1) {
    throw new Error('Account not found');
  }
  
  // Check if username already exists (if changing username)
  if (data.username && data.username !== mockLoginAccounts[accountIndex].username) {
    if (mockLoginAccounts.some(acc => acc.username === data.username && acc.id !== userId)) {
      throw new Error('Username already exists');
    }
  }
  
  const updatedAccount: LoginAccount = {
    ...mockLoginAccounts[accountIndex],
    ...(data.username && { username: data.username }),
    ...(data.password && { password: data.password }),
    ...(data.email && { email: data.email }),
  };
  
  mockLoginAccounts[accountIndex] = updatedAccount;
  
  // Update email notification if email changed
  if (data.email) {
    const notificationIndex = mockEmailNotifications.findIndex(notif => notif.loginAccountId === userId);
    if (notificationIndex !== -1) {
      mockEmailNotifications[notificationIndex].email = data.email;
    }
  }
  
  return updatedAccount;
};

