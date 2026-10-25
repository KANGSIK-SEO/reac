import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TaskForm } from "../components/TaskForm";
import { ErrorState, LoadingState, PageHeader } from "../components/ui";
import { getTask, updateTask } from "../lib/tasks";
import type { Task, TaskInput } from "../types";

export function TaskEditPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setLoadError(null);
    getTask(id)
      .then((value) => { if (active) setTask(value); })
      .catch((cause: unknown) => {
        if (active) setLoadError(cause instanceof Error ? cause.message : "태스크를 불러오지 못했습니다.");
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);

  async function handleSubmit(input: TaskInput) {
    setSubmitting(true);
    setSubmitError(null);
    try {
      await updateTask(id, input);
      navigate(`/tasks/${id}`, { state: { notice: "변경사항을 저장했어요." } });
    } catch (cause) {
      setSubmitError(cause instanceof Error ? cause.message : "변경사항을 저장하지 못했습니다.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Link className="back-link" to={`/tasks/${id}`}><ArrowLeft size={16} /> 태스크로 돌아가기</Link>
      <PageHeader eyebrow="태스크 편집" title="내용 수정하기" description="필요한 내용을 업데이트해 주세요." />
      {loading ? <LoadingState label="태스크 정보를 불러오고 있어요" /> : loadError ? <ErrorState message={loadError} /> : task && (
        <TaskForm key={task.id} initialTask={task} onSubmit={handleSubmit} submitting={submitting} submitError={submitError} submitLabel="변경사항 저장" />
      )}
    </>
  );
}
