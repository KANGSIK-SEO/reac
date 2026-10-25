export type TaskStatus = "todo" | "done";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

export type TaskInput = Pick<
  Task,
  "title" | "description" | "status" | "priority" | "due_date"
>;
