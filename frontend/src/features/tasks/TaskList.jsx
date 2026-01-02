import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({
  tasks,
  onEdit,
  onToggle,
  onDelete,
  toggling,
  deleting,
}) {
  if (!tasks?.length) {
    return (
      <div className="rounded-2xl border bg-white p-6 text-sm text-slate-500">
        No tasks found.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((t) => (
        <TaskItem
          key={t.id}
          task={t}
          onEdit={onEdit}
          onToggle={onToggle}
          onDelete={onDelete}
          toggling={toggling}
          deleting={deleting}
        />
      ))}
    </div>
  );
}
