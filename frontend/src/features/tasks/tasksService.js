import api from "../../api/axios";

export async function getTasks(page = 1) {
  const res = await api.get(`/tasks?page=${page}`);
  return res.data; // { data:[], links:{}, meta:{} }
}

export async function createTask(payload) {
  const res = await api.post("/tasks", payload);
  return res.data; // { message, task }
}

export async function updateTask(id, payload) {
  const res = await api.put(`/tasks/${id}`, payload);
  return res.data; // { message, task }
}

export async function deleteTask(id) {
  const res = await api.delete(`/tasks/${id}`);
  return res.data; // { message }
}
