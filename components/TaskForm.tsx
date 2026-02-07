"use client";

import { useState } from "react";
import { Task } from "@/types/task";
import toast from "react-hot-toast";

interface Props {
  onAdd: (task: Task) => void;
}

export default function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    onAdd({
      id: crypto.randomUUID(),
      title,
      status: "pending",
    });
    toast.success("Task added successfully");

    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="border p-2 rounded w-full"
        placeholder="New task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 rounded"
      >
        Add
      </button>
    </form>
  );
}
