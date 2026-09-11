/* eslint-disable import/no-named-as-default-member */
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const POCKETBASE_URL = 'http://10.227.208.211:8090';
const AUTH_TOKEN_KEY = 'pb_auth_token';
const AUTH_MODEL_KEY = 'pb_auth_model';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  verified: boolean;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  emailVisibility: boolean;
}

export interface AuthResponse {
  token: string;
  record: AuthUser;
}

// Save auth data to secure storage
export const saveAuth = async (authData: AuthResponse) => {
  try {
    await SecureStore.setItemAsync(AUTH_TOKEN_KEY, authData.token);
    await SecureStore.setItemAsync(AUTH_MODEL_KEY, JSON.stringify(authData.record));
    console.log('✅ Auth saved to secure storage');
  } catch (error) {
    console.error('❌ Failed to save auth:', error);
  }
};

// Get auth token from storage
export const getAuthToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error('❌ Failed to get auth token:', error);
    return null;
  }
};

// Get user data from storage
export const getAuthUser = async (): Promise<AuthUser | null> => {
  try {
    const userData = await SecureStore.getItemAsync(AUTH_MODEL_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('❌ Failed to get auth user:', error);
    return null;
  }
};

// Clear auth data (logout)
export const clearAuth = async () => {
  try {
    await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
    await SecureStore.deleteItemAsync(AUTH_MODEL_KEY);
    console.log('✅ Auth cleared');
  } catch (error) {
    console.error('❌ Failed to clear auth:', error);
  }
};

// Check if user is authenticated
export const isAuthenticated = async (): Promise<boolean> => {
  const token = await getAuthToken();
  return !!token;
};

// Create axios instance with auth interceptor
export const createAuthenticatedAxios = () => {
  const instance = axios.create({
    baseURL: POCKETBASE_URL,
  });

  // Add token to every request
  instance.interceptors.request.use(async (config) => {
    const token = await getAuthToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  });

  // Handle 401 errors (token expired)
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        // Token expired, clear auth
        await clearAuth();
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

// Sign up function
export const signUp = async (data: {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  avatar?: { uri: string; name: string; type: string };
}): Promise<AuthResponse> => {
  const formData = new FormData();
  formData.append('username', data.name);
  formData.append('email', data.email);
  formData.append('password', data.password);
  formData.append('passwordConfirm', data.passwordConfirm);
  formData.append('emailVisibility', 'true');

  if (data.avatar) {
    formData.append('avatar', data.avatar as any);
  }

  // Create user
  const response = await axios.post(`${POCKETBASE_URL}/api/collections/users/records`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  // Auto login
  const loginResponse = await axios.post(
    `${POCKETBASE_URL}/api/collections/users/auth-with-password`,
    { identity: data.email, password: data.password }
  );

  const authData: AuthResponse = {
    token: loginResponse.data.token,
    record: loginResponse.data.record,
  };

  // Save to secure storage
  await saveAuth(authData);

  return authData;
};

// Sign in function
export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await axios.post(`${POCKETBASE_URL}/api/collections/users/auth-with-password`, {
    identity: email,
    password,
  });

  const authData: AuthResponse = {
    token: response.data.token,
    record: response.data.record,
  };

  // Save to secure storage
  await saveAuth(authData);

  return authData;
};

// Sign out function
export const signOut = async () => {
  await clearAuth();
};

// Refresh auth token (call this periodically or on app startup)
export const refreshAuth = async (): Promise<boolean> => {
  try {
    const token = await getAuthToken();
    if (!token) return false;

    // Verify token is still valid by making a test request
    const response = await axios.post(`${POCKETBASE_URL}/api/collections/users/auth-refresh`, {}, {
      headers: { Authorization: token },
    });

    if (response.data.token) {
      await saveAuth({
        token: response.data.token,
        record: response.data.record,
      });
      return true;
    }
    return false;
  } catch (error) {
    // Token invalid, clear auth
    await clearAuth();
    return false;
  }
};
