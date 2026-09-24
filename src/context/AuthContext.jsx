import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const CREDENTIALS = {
  customer: { mobile: "9999999999", password: "demo123", name: "Arjun Krishna", email: "arjun.krishna@example.com" },
  admin: { email: "admin@demo.local", password: "admin123", name: "Aarav Sharma" },
};

const STORAGE_KEY = "howladar-auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const login = useCallback((role) => {
    const cred = CREDENTIALS[role];
    const session =
      role === "customer"
        ? { role, name: cred.name, email: cred.email, mobile: cred.mobile }
        : { role, name: cred.name, email: cred.email };
    setUser(session);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    return session;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(() => ({ user, isLoggedIn: !!user, login, logout }), [user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

export const DEMO_CREDENTIALS = CREDENTIALS;
