import React, { createContext, useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import { clearAuth, getToken, getUser, saveAuth } from "./authStorage";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());

  const isAdmin = user?.role === "admin";

  // validate token on load
  useEffect(() => {
    const boot = async () => {
      if (!token) return;
      try {
        const res = await api.get("/me");
        setUser(res.data.user);
        saveAuth(token, res.data.user);
      } catch {
        clearAuth();
        setToken(null);
        setUser(null);
      }
    };
    boot();
  }, [token]);

  const value = useMemo(
    () => ({
      token,
      user,
      isAdmin,
      login: (t, u) => {
        saveAuth(t, u);
        setToken(t);
        setUser(u);
      },
      logout: async () => {
        try {
          await api.post("/logout");
        } catch (e){
          console.log(e);
        }
        clearAuth();
        setToken(null);
        setUser(null);
      },
    }),
    [token, user, isAdmin]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
