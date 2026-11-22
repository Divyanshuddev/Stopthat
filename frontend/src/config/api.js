// Centralized API URL resolution for Vercel + Render deployment
// When deployed on Vercel: Set VITE_API_BASE_URL to your Render URL (e.g., https://your-backend.onrender.com)
// In local development: Defaults to empty string, routing requests through the local Vite proxy.

const RAW_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
export const API_BASE_URL = RAW_BASE_URL.replace(/\/+$/, '');

export const apiUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${cleanEndpoint}`;
};
