"use client";

const AUTH_TOKEN_KEY = "diner_auth_token";
const AUTH_USER_KEY = "diner_auth_user";

export interface AuthUser {
  _id: string;
  email: string;
  name: string;
  role: string;
  token: string;
}

export const authStorage = {
  getToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },
  setToken: (token: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  },
  removeToken: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
  },
  getUser: (): AuthUser | null => {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem(AUTH_USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },
  setUser: (user: AuthUser): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    localStorage.setItem(AUTH_TOKEN_KEY, user.token);
  },
  isAuthenticated: (): boolean => {
    return authStorage.getToken() !== null;
  },
};

