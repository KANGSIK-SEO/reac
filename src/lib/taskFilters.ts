import type { Task, TaskStatus } from "../types";

export function filterTasks(
  tasks: Task[],
  query = "",
  status: TaskStatus | "all" = "all",
): Task[] {
  const normalizedQuery = query.trim().toLowerCase();
  return tasks.filter((task) => {
    const matchesText = `${task.title} ${task.description}`
      .toLowerCase()
      .includes(normalizedQuery);
    return matchesText && (status === "all" || task.status === status);
  });
}
