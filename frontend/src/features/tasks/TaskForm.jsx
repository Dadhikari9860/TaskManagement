import React, { useState } from "react";
import FieldError from "../../components/FieldError";

export default function TaskForm({ isAdmin, onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [userId, setUserId] = useState("");

  const [saving, setSaving] = useState(false);
  const [serverMsg, setServerMsg] = useState("");
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!title.trim()) e.title = "Title is required";
    else if (title.trim().length < 3)
      e.title = "Title must be at least 3 characters";
    if (description.length > 500)
      e.description = "Description max 500 characters";
    if (isAdmin && userId && !/^\d+$/.test(userId))
      e.user_id = "user_id must be a number";
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
      const payload = {
        title: title.trim(),
        description: description.trim() ? description.trim() : null,
        completed: !!completed,
      };
      if (isAdmin && userId) payload.user_id = Number(userId);

      await onCreate(payload);

      setTitle("");
      setDescription("");
      setCompleted(false);
      setUserId("");
      setErrors({});
    } catch (err) {
      if (err?.response?.status === 422) {
        const v = err.response.data.errors || {};
        setErrors({
          title: v.title?.[0],
          description: v.description?.[0],
          user_id: v.user_id?.[0],
        });
      } else {
        setServerMsg("Failed to create task");
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      <h3 className="text-base font-semibold text-slate-900">Create Task</h3>
      <p className="mt-1 text-sm text-slate-500">Add a new task</p>

      {serverMsg ? (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {serverMsg}
        </div>
      ) : null}

      <form className="mt-5 space-y-4" onSubmit={submit}>
        <div>
          <label className="text-sm font-medium text-slate-700">Title</label>
          <input
            className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900/20"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <FieldError text={errors.title} />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Description
          </label>
          <textarea
            rows={4}
            className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900/20"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <FieldError text={errors.description} />
          <p className="mt-1 text-xs text-slate-400">
            {description.length}/500
          </p>
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          Completed
        </label>

        {isAdmin ? (
          <div>
            <label className="text-sm font-medium text-slate-700">
              Assign to user_id (admin)
            </label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900/20"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="e.g. 1"
            />
            <FieldError text={errors.user_id} />
          </div>
        ) : null}

        <button
          className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
          disabled={saving}
        >
          {saving ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
}
