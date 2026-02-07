"use client";

import { useEffect, useState } from "react";
import { Task, TaskStatus } from "@/types/task";
import { STATUS_CONFIG } from "@/constants/status";

interface Props {
  onAdd: (task: Task) => void;
  initialTask?: Task;
}

export default function TaskForm({ onAdd, initialTask }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("pending");

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description);
      setStatus(initialTask.status);
    }
  }, [initialTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    onAdd({
      id: initialTask?.id ?? crypto.randomUUID(),
      title,
      description,
      status,
    });

    if (!initialTask) {
      setTitle("");
      setDescription("");
      setStatus("pending");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Title */}
      <input
        className="border p-2 rounded w-full"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Description */}
      <textarea
        className="border p-2 rounded w-full"
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
      />

      {/* Status */}
      <select
        className="border p-2 rounded w-full"
        value={status}
        onChange={(e) => setStatus(e.target.value as TaskStatus)}
      >
        {Object.entries(STATUS_CONFIG).map(([key, { label }]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>

      {/* Submit */}
      <button
        type="submit"
        className={`text-white px-4 py-2 rounded w-full
        ${initialTask ? "bg-green-600" : "bg-blue-600"}`}
      >
        {initialTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
}
