import { TaskStatus } from "@/types/task";

export const STATUS_CONFIG: Record<
  TaskStatus,
  { label: string }
> = {
  pending: { label: "Pending" },
  inprogress: { label: "In Progress" },
  review: { label: "In Review" },
  blocked: { label: "Blocked" },
  onhold: { label: "On Hold" },
  completed: { label: "Completed" },
  cancelled: { label: "Cancelled" },
};
