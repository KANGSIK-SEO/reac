import { useState, type FormEvent } from "react";
import { Eye, FileText, Sparkles } from "lucide-react";
import type { Task, TaskInput, TaskPriority, TaskStatus } from "../types";
import { Button, PriorityBadge, StatusBadge } from "./ui";

const emptyTask: TaskInput = {
  title: "",
  description: "",
  status: "todo",
  priority: "medium",
  due_date: null,
};

export function TaskForm({
  initialTask,
  onSubmit,
  submitting,
  submitError,
  submitLabel,
}: {
  initialTask?: Task;
  onSubmit: (input: TaskInput) => Promise<void>;
  submitting: boolean;
  submitError: string | null;
  submitLabel: string;
}) {
  const [values, setValues] = useState<TaskInput>(
    initialTask
      ? {
          title: initialTask.title,
          description: initialTask.description,
          status: initialTask.status,
          priority: initialTask.priority,
          due_date: initialTask.due_date,
        }
      : emptyTask,
  );
  const [titleError, setTitleError] = useState("");

  function update<K extends keyof TaskInput>(key: K, value: TaskInput[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    if (key === "title" && typeof value === "string" && value.trim()) setTitleError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!values.title.trim()) {
      setTitleError("태스크 이름을 입력해 주세요.");
      return;
    }
    setTitleError("");
    await onSubmit({ ...values, title: values.title.trim() });
  }

  return (
    <div className="form-layout">
      <form className="task-form" onSubmit={handleSubmit} noValidate>
        <div className="form-section-heading">
          <span className="form-icon"><FileText size={18} /></span>
          <div><strong>태스크 정보</strong><p>기억하고 싶은 일을 적어보세요.</p></div>
        </div>
        <label className="field">
          <span>태스크 이름 <b>*</b></span>
          <input
            autoFocus
            maxLength={120}
            value={values.title}
            onChange={(event) => update("title", event.target.value)}
            placeholder="예: 주간 회고 작성하기"
            aria-invalid={Boolean(titleError)}
            aria-describedby={titleError ? "title-error" : undefined}
          />
          {titleError && <small className="field-error" id="title-error">{titleError}</small>}
        </label>
        <label className="field">
          <span>간단한 메모</span>
          <textarea
            rows={5}
            maxLength={1000}
            value={values.description}
            onChange={(event) => update("description", event.target.value)}
            placeholder="필요한 내용을 자유롭게 적어주세요."
          />
          <small className="field-hint">{values.description.length}/1000</small>
        </label>
        <div className="field-grid">
          <label className="field">
            <span>우선순위</span>
            <select
              value={values.priority}
              onChange={(event) => update("priority", event.target.value as TaskPriority)}
            >
              <option value="low">낮음</option>
              <option value="medium">보통</option>
              <option value="high">높음</option>
            </select>
          </label>
          <label className="field">
            <span>마감일</span>
            <input
              type="date"
              value={values.due_date ?? ""}
              onChange={(event) => update("due_date", event.target.value || null)}
            />
          </label>
        </div>
        {initialTask && (
          <label className="field">
            <span>진행 상태</span>
            <select
              value={values.status}
              onChange={(event) => update("status", event.target.value as TaskStatus)}
            >
              <option value="todo">진행 전</option>
              <option value="done">완료</option>
            </select>
          </label>
        )}
        {submitError && <div className="form-error" role="alert">{submitError}</div>}
        <div className="form-actions">
          <Button type="submit" disabled={submitting}>
            {submitting ? "저장 중..." : submitLabel}
          </Button>
        </div>
      </form>
      <aside className="preview-card">
        <div className="preview-heading"><span><Eye size={16} /> 실시간 미리보기</span><Sparkles size={17} /></div>
        <div className="preview-content">
          <div className="preview-top"><StatusBadge status={values.status} /><PriorityBadge priority={values.priority} /></div>
          <h3>{values.title || "새로운 태스크"}</h3>
          <p>{values.description || "메모를 추가하면 여기에 표시돼요."}</p>
          {values.due_date && <small>마감일 · {values.due_date}</small>}
        </div>
        <div className="preview-tip">작은 한 걸음도 기록하면 더 선명해져요.</div>
      </aside>
    </div>
  );
}
