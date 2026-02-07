import { Task } from "@/types/task";

interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, onToggle, onDelete }: Props) {
  const isCompleted = task.status === "completed";

  return (
    <div className="group relative flex justify-between items-center border p-2 rounded">
      <span
        onClick={() => onToggle(task.id)}
        className={`cursor-pointer ${
          isCompleted ? "line-through text-gray-400" : ""
        }`}
      >
        {task.title}
      </span>

      <div
        className={`pointer-events-none absolute inset-0 hidden group-hover:flex 
        items-center justify-center text-sm font-semibold
        ${isCompleted ? "text-green-600" : "text-orange-500"}`}
      >
        {isCompleted ? "Completed" : "Pending"}
      </div>

      {/* Delete */}
      <button
        onClick={() => onDelete(task.id)}
        className="text-red-500 z-10"
      >
        ✕
      </button>
    </div>
  );
}
