import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export default function Layout({ children }) {
  const nav = useNavigate();
  const { user, isAdmin, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">
              Task Manager
            </h1>
            <p className="text-sm text-slate-500">
              {user ? (
                <>
                  Logged in as <span className="font-medium">{user.name}</span>{" "}
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
                    {isAdmin ? "admin" : "user"}
                  </span>
                </>
              ) : (
                "Not logged in"
              )}
            </p>
          </div>

          {user ? (
            <button
              onClick={async () => {
                await logout();
                nav("/login");
              }}
              className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
            >
              Logout
            </button>
          ) : null}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}
