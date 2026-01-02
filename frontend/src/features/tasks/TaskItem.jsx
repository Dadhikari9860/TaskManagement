import React from "react";

export default function TaskItem({
  task,
  onEdit,
  onToggle,
  onDelete,
  toggling,
  deleting,
}) {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="truncate text-sm font-semibold text-slate-900">
              {task.title}
            </h4>
            <span
              className={
                task.completed
                  ? "rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700"
                  : "rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700"
              }
            >
              {task.completed ? "done" : "pending"}
            </span>
          </div>

          {task.description ? (
            <p className="mt-2 text-sm text-slate-600">{task.description}</p>
          ) : (
            <p className="mt-2 text-sm text-slate-400">No description</p>
          )}

          <p className="mt-2 text-xs text-slate-400">
            Task #{task.id} • user_id: {task.user_id}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <button
            className="rounded-lg border bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
            onClick={() => onEdit(task)}
          >
            Edit
          </button>

          <button
            className="rounded-lg border bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            disabled={toggling}
            onClick={() => onToggle(task)}
          >
            Toggle
          </button>

          <button
            className="rounded-lg bg-red-500 px-3 py-2 text-xs font-medium text-white hover:bg-red-600 disabled:opacity-50"
            disabled={deleting}
            onClick={() => onDelete(task)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
