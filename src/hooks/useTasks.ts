import { useCallback, useEffect, useState } from "react";
import { listTasks } from "../lib/tasks";
import type { Task } from "../types";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setTasks(await listTasks());
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "태스크를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { tasks, loading, error, refresh };
}
