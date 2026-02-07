import { Task } from "@/types/task";

interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const STATUS_STYLES: Record<
  Task["status"],
  { label: string; className: string }
> = {
  pending: {
    label: "Pending",
    className: "bg-orange-200 text-orange-700",
  },

  inprogress: {
    label: "In Progress",
    className: "bg-blue-200 text-blue-700",
  },

  completed: {
    label: "Completed",
    className: "bg-green-200 text-green-700",
  },

  blocked: {
    label: "Blocked",
    className: "bg-red-200 text-red-700",
  },

  review: {
    label: "In Review",
    className: "bg-purple-200 text-purple-700",
  },

  onhold: {
    label: "On Hold",
    className: "bg-gray-200 text-gray-700",
  },

  cancelled: {
    label: "Cancelled",
    className: "bg-zinc-200 text-zinc-600 line-through",
  },
};


export default function TaskItem({ task, onToggle, onDelete, onEdit }: Props) {
  const statusConfig = STATUS_STYLES[task.status];

  return (
    <div className="relative p-4 rounded-lg border w-full bg-white">
      {/* Top row */}
      <div className="flex justify-between items-start">
        <p
          onClick={() => onToggle(task.id)}
          className="cursor-pointer font-semibold truncate text-gray-900"
        >
          {task.title}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Status */}
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full ${statusConfig.className}`}
          >
            {statusConfig.label}
          </span>

          {/* Edit */}
          <button
            onClick={() => onEdit(task)}
            className="text-yellow-500"
            title="Edit"
          >
            ✏️
          </button>

          {/* Delete */}
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-500 font-bold"
            title="Delete"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="mt-2 text-sm text-gray-600 line-clamp-2">
        {task.description}
      </p>
    </div>
  );
}
