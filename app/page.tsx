"use client";

import { useEffect, useState } from "react";
import { Task } from "@/types/task";
import { getTasks, saveTasks } from "@/utils/storage";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import toast from "react-hot-toast";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "pending" ? "completed" : "pending" }
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
    <main className="max-w-md mx-auto mt-10 space-y-4">
      <h1 className="text-2xl font-bold">Task Manager</h1>

      <TaskForm onAdd={addTask} />
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
    </main>
  );
}
