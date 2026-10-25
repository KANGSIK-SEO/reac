import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { TaskForm } from "../components/TaskForm";
import { PageHeader } from "../components/ui";
import { createTask } from "../lib/tasks";
import type { TaskInput } from "../types";

export function TaskCreatePage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(input: TaskInput) {
    setSubmitting(true);
    setError(null);
    try {
      const task = await createTask(input);
      navigate(`/tasks/${task.id}`, { state: { notice: "새 태스크를 저장했어요." } });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "태스크를 저장하지 못했습니다.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Link className="back-link" to="/tasks"><ArrowLeft size={16} /> 태스크 목록</Link>
      <PageHeader eyebrow="새로운 시작" title="새 태스크 만들기" description="해야 할 일을 적고, 오늘의 계획에 더해보세요." />
      <TaskForm onSubmit={handleSubmit} submitting={submitting} submitError={error} submitLabel="태스크 저장하기" />
    </>
  );
}
