const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, { method = "GET", body, token } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong. Please try again.");
  }
  return data;
}

export const authApi = {
  login: (email, password) => request("/auth/login", { method: "POST", body: { email, password } }),
  register: (payload) => request("/auth/register", { method: "POST", body: payload }),
  me: (token) => request("/auth/me", { token }),
};

export const usersApi = {
  listDoctors: (token) => request("/users/doctors", { token }),
  listAll: (token) => request("/users", { token }),
  deactivate: (id, token) => request(`/users/${id}/deactivate`, { method: "PATCH", token }),
  activate: (id, token) => request(`/users/${id}/activate`, { method: "PATCH", token }),
  createStaff: (payload, token) => request("/auth/create-staff", { method: "POST", body: payload, token }),
};
