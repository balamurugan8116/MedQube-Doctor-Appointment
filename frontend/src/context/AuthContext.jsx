import { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "../api/client";

const AuthContext = createContext(null);

const TOKEN_KEY = "medqube_token";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // On first load, try to restore session from a saved token
  useEffect(() => {
    const restore = async () => {
      const saved = sessionStorage.getItem(TOKEN_KEY);
      if (!saved) {
        setLoading(false);
        return;
      }
      try {
        const { user: restoredUser } = await authApi.me(saved);
        setUser(restoredUser);
        setToken(saved);
      } catch {
        sessionStorage.removeItem(TOKEN_KEY);
      } finally {
        setLoading(false);
      }
    };
    restore();
  }, []);

  const login = async (email, password) => {
    const { token: newToken, user: newUser } = await authApi.login(email, password);
    sessionStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
    setUser(newUser);
    return newUser;
  };

  const register = async (payload) => {
    const { token: newToken, user: newUser } = await authApi.register(payload);
    sessionStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
