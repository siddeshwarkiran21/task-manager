import { Task } from "@/types/task";
import TaskItem from "./TaskItem";

interface Props {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void; // 👈 add this
}

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
  onEdit,
}: Props) {
  if (!tasks.length) {
    return <p className="text-gray-500">No tasks yet</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit} 
        />
      ))}
    </div>
  );
}
