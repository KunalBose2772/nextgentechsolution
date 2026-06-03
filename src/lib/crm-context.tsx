"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import type { CRMUser } from "@/types/crm";

interface CRMContextValue {
  user: CRMUser | null;
  loading: boolean;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const CRMContext = createContext<CRMContextValue>({
  user: null, loading: true,
  logout: async () => {},
  refresh: async () => {},
});

export function CRMProvider({ children, initialUser }: { children: ReactNode; initialUser?: CRMUser | null }) {
  const [user,    setUser]    = useState<CRMUser | null>(initialUser ?? null);
  const [loading, setLoading] = useState(!initialUser);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!initialUser) refresh();
  }, [initialUser, refresh]);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    window.location.href = "/admin";
  };

  return (
    <CRMContext.Provider value={{ user, loading, logout, refresh }}>
      {children}
    </CRMContext.Provider>
  );
}

export function useCRM() {
  return useContext(CRMContext);
}
