import { useEffect, useState } from "react";
import { ArrowLeft, CalendarDays, Check, Pencil, Trash2 } from "lucide-react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, ErrorState, LoadingState, PriorityBadge, StatusBadge } from "../components/ui";
import { deleteTask, getTask, updateTask } from "../lib/tasks";
import type { Task } from "../types";

export function TaskDetailPage() {
  const { id = "" } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>((location.state as { notice?: string } | null)?.notice ?? null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    getTask(id)
      .then((value) => { if (active) setTask(value); })
      .catch((cause: unknown) => {
        if (active) setError(cause instanceof Error ? cause.message : "태스크를 불러오지 못했습니다.");
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);

  async function toggleStatus() {
    if (!task) return;
    setBusy(true);
    setError(null);
    try {
      const updated = await updateTask(task.id, {
        title: task.title,
        description: task.description,
        status: task.status === "done" ? "todo" : "done",
        priority: task.priority,
        due_date: task.due_date,
      });
      setTask(updated);
      setNotice(updated.status === "done" ? "태스크를 완료했어요!" : "완료 상태를 취소했어요.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "상태를 변경하지 못했습니다.");
    } finally {
      setBusy(false);
    }
  }

  async function removeTask() {
    if (!task || !window.confirm("이 태스크를 삭제할까요? 삭제한 태스크는 복구할 수 없습니다.")) return;
    setBusy(true);
    setError(null);
    try {
      await deleteTask(task.id);
      navigate("/tasks", { replace: true });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "태스크를 삭제하지 못했습니다.");
      setBusy(false);
    }
  }

  if (loading) return <LoadingState label="태스크를 불러오고 있어요" />;
  if (error && !task) {
    return <><Link className="back-link" to="/tasks"><ArrowLeft size={16} /> 태스크 목록</Link><ErrorState message={error} /></>;
  }
  if (!task) return <ErrorState message="요청한 태스크를 찾을 수 없습니다." />;

  return (
    <>
      <Link className="back-link" to="/tasks"><ArrowLeft size={16} /> 태스크 목록</Link>
      {notice && <div className="success-notice" role="status"><Check size={16} />{notice}<button onClick={() => setNotice(null)} aria-label="알림 닫기">×</button></div>}
      {error && <div className="inline-error" role="alert">{error}</div>}
      <article className="detail-card">
        <div className="detail-actions">
          <span className="eyebrow">TASK DETAIL</span>
          <div>
            <Link className="button button-secondary button-small" to={`/tasks/${id}/edit`}><Pencil size={15} /> 수정</Link>
            <Button variant="danger" className="button-small" icon={<Trash2 size={15} />} disabled={busy} onClick={() => void removeTask()}>삭제</Button>
          </div>
        </div>
        <div className="detail-badges"><StatusBadge status={task.status} /><PriorityBadge priority={task.priority} /></div>
        <h1>{task.title}</h1>
        <p className="detail-description">{task.description || "추가된 메모가 없습니다."}</p>
        <div className="detail-info">
          <div><span>마감일</span><strong><CalendarDays size={15} />{task.due_date || "설정하지 않음"}</strong></div>
          <div><span>만든 날짜</span><strong>{new Date(task.created_at).toLocaleDateString("ko-KR")}</strong></div>
        </div>
        <Button className="complete-button" variant={task.status === "done" ? "secondary" : "primary"} icon={<Check size={17} />} disabled={busy} onClick={() => void toggleStatus()}>
          {busy ? "변경 중..." : task.status === "done" ? "완료 취소하기" : "완료로 표시하기"}
        </Button>
      </article>
    </>
  );
}
