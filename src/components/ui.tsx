import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import { AlertCircle, Check, Circle, Clock3, Search } from "lucide-react";
import type { TaskPriority, TaskStatus } from "../types";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  icon?: ReactNode;
};

export function Button({
  variant = "primary",
  icon,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={`button button-${variant} ${className}`} {...props}>
      {icon}
      {children}
    </button>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="page-header">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatusBadge({ status }: { status: TaskStatus }) {
  return (
    <span className={`badge status-${status}`}>
      {status === "done" ? <Check size={13} /> : <Circle size={11} />}
      {status === "done" ? "완료" : "진행 전"}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: TaskPriority }) {
  const label = { low: "낮음", medium: "보통", high: "높음" }[priority];
  return <span className={`priority priority-${priority}`}>{label} 우선순위</span>;
}

export function SearchField(
  props: InputHTMLAttributes<HTMLInputElement>,
) {
  return (
    <label className="search-field">
      <Search size={17} aria-hidden="true" />
      <input aria-label="태스크 검색" placeholder="태스크 검색..." {...props} />
    </label>
  );
}

export function StatCard({
  label,
  value,
  detail,
  tone = "purple",
}: {
  label: string;
  value: number | string;
  detail: string;
  tone?: "purple" | "green" | "orange";
}) {
  return (
    <article className={`stat-card stat-${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </article>
  );
}

export function LoadingState({ label = "태스크를 불러오고 있어요" }: { label?: string }) {
  return (
    <div className="state-panel" role="status">
      <span className="spinner" />
      <strong>{label}</strong>
      <p>잠시만 기다려 주세요.</p>
    </div>
  );
}

export function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="state-panel error-panel" role="alert">
      <span className="state-icon"><AlertCircle size={22} /></span>
      <strong>연결을 확인해 주세요</strong>
      <p>{message}</p>
      {onRetry && <Button variant="secondary" onClick={onRetry}>다시 시도</Button>}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="state-panel empty-panel">
      <span className="state-icon"><Clock3 size={22} /></span>
      <strong>{title}</strong>
      <p>{description}</p>
      {action}
    </div>
  );
}
