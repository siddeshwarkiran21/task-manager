"use client";

import { useEffect, useRef, useState } from "react";
import { Task, TaskStatus } from "@/types/task";
import { getTasks, saveTasks } from "@/utils/storage";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import toast from "react-hot-toast";

const STATUS_LABELS: Record<TaskStatus, string> = {
  pending: "Pending",
  inprogress: "In Progress",
  review: "In Review",
  blocked: "Blocked",
  onhold: "On Hold",
  completed: "Completed",
  cancelled: "Cancelled",
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // 🔹 FILTER STATE
  const [statusFilter, setStatusFilter] = useState<TaskStatus[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  /* ---------- OUTSIDE CLICK ---------- */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------- LOAD FROM STORAGE ---------- */
  useEffect(() => {
    setTasks(getTasks());

    const savedFilter = localStorage.getItem("statusFilter");
    if (savedFilter) {
      setStatusFilter(JSON.parse(savedFilter));
    }
  }, []);

  /* ---------- SAVE TO STORAGE ---------- */
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("statusFilter", JSON.stringify(statusFilter));
  }, [statusFilter]);

  /* ---------- FILTERED TASKS ---------- */
  const filteredTasks =
    statusFilter.length === 0
      ? tasks
      : tasks.filter((task) => statusFilter.includes(task.status));

  /* ---------- ACTIONS ---------- */
  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
    setIsModalOpen(false);
    toast.success("Task added");
  };

  const updateTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
    setEditingTask(null);
    toast.success("Task updated");
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: t.status === "pending" ? "completed" : "pending",
            }
          : t
      )
    );
    toast.success("Task status updated");
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    toast.error("Task deleted");
  };

  return (
    <main className="p-10 space-y-4">
      {/* ---------- HEADER ---------- */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <div className="flex items-center gap-4">
          {/* FILTER */}
          {tasks.length > 0 && (
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setIsFilterOpen((prev) => !prev)}
                className="bg-gray-200 px-4 py-2 rounded-2xl"
              >
                Filter
              </button>

              {isFilterOpen && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow p-3 w-48 z-10 space-y-2">
                  {Object.entries(STATUS_LABELS).map(([value, label]) => (
                    <label
                      key={value}
                      className="flex items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={statusFilter.includes(value as TaskStatus)}
                        onChange={() =>
                          setStatusFilter((prev) =>
                            prev.includes(value as TaskStatus)
                              ? prev.filter((s) => s !== value)
                              : [...prev, value as TaskStatus]
                          )
                        }
                      />
                      {label}
                    </label>
                  ))}

                  <button
                    onClick={() => setStatusFilter([])}
                    className="text-xs text-blue-600"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ADD */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 rounded-full text-white px-4 py-2"
          >
            + Add
          </button>
        </div>
      </div>

      {/* ---------- FILTER CHIPS ---------- */}
      {statusFilter.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {statusFilter.map((status) => (
            <span
              key={status}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-200 text-sm"
            >
              {STATUS_LABELS[status]}
              <button
                onClick={() =>
                  setStatusFilter((prev) =>
                    prev.filter((s) => s !== status)
                  )
                }
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}

      {/* ---------- TASK LIST ---------- */}
      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={(task) => setEditingTask(task)}
      />

      {/* ---------- ADD MODAL ---------- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-4 rounded w-full max-w-sm space-y-3">
            <h2 className="text-lg font-semibold">Add New Task</h2>
            <TaskForm onAdd={addTask} />
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ---------- EDIT MODAL ---------- */}
      {editingTask && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-4 rounded w-full max-w-sm space-y-3">
            <h2 className="text-lg font-semibold">Edit Task</h2>
            <TaskForm
              initialTask={editingTask}
              onAdd={updateTask}
            />
            <button
              onClick={() => setEditingTask(null)}
              className="w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
