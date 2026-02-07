export type TaskStatus =
  | "pending"
  | "inprogress"
  | "review"
  | "blocked"
  | "onhold"
  | "completed"
  | "cancelled";



export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
