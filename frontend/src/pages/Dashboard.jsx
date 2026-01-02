import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Pagination from "../components/Pagination";
import { useAuth } from "../auth/useAuth";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../features/tasks/tasksService";
import TaskForm from "../features/tasks/TaskForm";
import TaskList from "../features/tasks/TaskList";
import EditTaskModal from "../features/tasks/EditTaskModal";

export default function Dashboard() {
  const { isAdmin } = useAuth();

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  // backend returns { data, links, meta }
  const [tasksRes, setTasksRes] = useState({
    data: [],
    links: null,
    meta: null,
  });

  const [toggling, setToggling] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Edit modal
  const [editOpen, setEditOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [savingEdit, setSavingEdit] = useState(false);

  async function load(p = page) {
    setLoading(true);
    setErrMsg("");
    try {
      const data = await getTasks(p);
      setTasksRes(data);
    } catch (e) {
      setErrMsg(e?.response?.data?.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const onCreate = async (payload) => {
    await createTask(payload);
    await load(page);
  };

  const onToggle = async (task) => {
    setToggling(true);
    try {
      await updateTask(task.id, { completed: !task.completed });
      await load(page);
    } finally {
      setToggling(false);
    }
  };

  const onDelete = async (task) => {
    if (!confirm("Delete this task?")) return;
    setDeleting(true);
    try {
      await deleteTask(task.id);
      await load(page);
    } finally {
      setDeleting(false);
    }
  };

  const onEdit = (task) => {
    setSelectedTask(task);
    setEditOpen(true);
  };

  const onSaveEdit = async (id, payload) => {
    setSavingEdit(true);
    try {
      await updateTask(id, payload);
      await load(page);
    } finally {
      setSavingEdit(false);
    }
  };

  return (
    <Layout>
      <div className="grid gap-4 lg:grid-cols-[380px_1fr]">
        <TaskForm isAdmin={isAdmin} onCreate={onCreate} />

        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-slate-900">Tasks</h3>
              <p className="text-sm text-slate-500">
                {isAdmin ? "Admin sees all tasks" : "You see only your tasks"}
              </p>
            </div>
          </div>

          {errMsg ? (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {errMsg}
            </div>
          ) : null}

          <div className="mt-4">
            {loading ? (
              <div className="rounded-2xl border bg-slate-50 p-6 text-sm text-slate-500">
                Loading...
              </div>
            ) : (
              <TaskList
                tasks={tasksRes.data}
                onEdit={onEdit}
                onToggle={onToggle}
                onDelete={onDelete}
                toggling={toggling}
                deleting={deleting}
              />
            )}
          </div>

          <Pagination
            meta={tasksRes.meta}
            links={tasksRes.links}
            onPage={setPage}
          />
        </div>
      </div>

      <EditTaskModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        task={selectedTask}
        isAdmin={isAdmin}
        onSave={onSaveEdit}
        saving={savingEdit}
      />
    </Layout>
  );
}
