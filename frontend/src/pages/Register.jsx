import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import FieldError from "../components/FieldError";
import api from "../api/axios";
import { useAuth } from "../auth/useAuth";

export default function Register() {
  const nav = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const [saving, setSaving] = useState(false);
  const [serverMsg, setServerMsg] = useState("");
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email.trim()) e.email = "Email is required";
    if (!password || password.length < 6)
      e.password = "Password min 6 characters";
    if (!role) e.role = "Role is required";
    return e;
  }

  async function submit(e) {
    e.preventDefault();
    setServerMsg("");

    const eObj = validate();
    setErrors(eObj);
    if (Object.keys(eObj).length) return;

    setSaving(true);
    try {
      const res = await api.post("/register", { name, email, password, role });
      login(res.data.token, res.data.user);
      nav("/dashboard");
    } catch (err) {
      if (err?.response?.status === 422) {
        const v = err.response.data.errors || {};
        setErrors({
          name: v.name?.[0],
          email: v.email?.[0],
          password: v.password?.[0],
          role: v.role?.[0],
        });
        setServerMsg("Validation error");
      } else {
        setServerMsg("Registration failed");
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <Layout>
      <div className="mx-auto grid min-h-[70vh] max-w-md place-items-center">
        <div className="w-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <h2 className="text-xl font-semibold text-slate-900">Register</h2>
          <p className="mt-1 text-sm text-slate-500">Create your account</p>

          {serverMsg ? (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {serverMsg}
            </div>
          ) : null}

          <form className="mt-5 space-y-4" onSubmit={submit}>
            <div>
              <label className="text-sm font-medium text-slate-700">Name</label>
              <input
                className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900/20"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FieldError text={errors.name} />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900/20"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FieldError text={errors.email} />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900/20"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FieldError text={errors.password} />
            </div>

            <button
              className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
              disabled={saving}
            >
              {saving ? "Creating..." : "Register"}
            </button>
          </form>

          <p className="mt-4 text-sm text-slate-600">
            Already have account?{" "}
            <Link
              className="font-medium text-slate-900 hover:underline"
              to="/login"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
