const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface ApiResponse<T> {
  success?: boolean;
  data?: T;
  error?: string;
  errors?: Array<{ msg: string; param: string }>;
}

// Minimal order-related types used by the frontend
export interface CreatedOrderData {
  order: Record<string, unknown>;
  paymentIntent?: { clientSecret?: string; id?: string } | null;
}

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || data.message || "An error occurred",
        errors: data.errors,
      };
    }

    return {
      success: true,
      data: data.data || data,
    };
  } catch {
    return {
      success: false,
      error: "Network error. Please check your connection.",
    };
  }
}

// Menu API
export const menuApi = {
  getAll: async (category?: string) => {
    const url = category ? `/menu?category=${encodeURIComponent(category)}` : "/menu";
    return apiRequest(url);
  },
  getById: async (id: string) => {
    return apiRequest(`/menu/${id}`);
  },
  create: async (item: Record<string, unknown>, token: string) => {
    return apiRequest("/menu", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(item),
    });
  },
  update: async (id: string, item: Record<string, unknown>, token: string) => {
    return apiRequest(`/menu/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(item),
    });
  },
  delete: async (id: string, token: string) => {
    return apiRequest(`/menu/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

// Order API
export const orderApi = {
  create: async (orderData: Record<string, unknown>) => {
    return apiRequest<CreatedOrderData>("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    });
  },
  getById: async (id: string) => {
    return apiRequest(`/orders/${id}`);
  },
  getAll: async (token: string, status?: string) => {
    const url = status ? `/orders?status=${status}` : "/orders";
    return apiRequest(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  updateStatus: async (id: string, status: string, token: string) => {
    return apiRequest(`/orders/${id}/status`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
  },
};

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    return apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },
  getMe: async (token: string) => {
    return apiRequest("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

// Admin API
export const adminApi = {
  getDashboard: async (token: string) => {
    return apiRequest("/admin/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getOrderStats: async (token: string, startDate?: string, endDate?: string) => {
    const params = new URLSearchParams();
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    const url = `/admin/orders/stats${params.toString() ? `?${params.toString()}` : ""}`;
    return apiRequest(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

