import { ArrowUpRight, Check, Circle, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import type { Task } from "../types";
import { PriorityBadge, StatusBadge } from "./ui";

export function TaskCard({
  task,
  onToggle,
}: {
  task: Task;
  onToggle: (task: Task) => void;
}) {
  return (
    <article className={`task-card ${task.status === "done" ? "task-done" : ""}`}>
      <button
        className={`task-check ${task.status === "done" ? "checked" : ""}`}
        aria-label={task.status === "done" ? "완료 취소" : "완료로 표시"}
        onClick={() => onToggle(task)}
      >
        {task.status === "done" ? <Check size={15} /> : <Circle size={17} />}
      </button>
      <Link className="task-card-main" to={`/tasks/${task.id}`}>
        <div className="task-card-title-row">
          <h3>{task.title}</h3>
          <ArrowUpRight size={16} className="card-arrow" />
        </div>
        <p>{task.description || "설명이 추가되지 않았어요."}</p>
        <div className="task-meta">
          <StatusBadge status={task.status} />
          <PriorityBadge priority={task.priority} />
          {task.due_date && (
            <span className="due-date"><CalendarDays size={13} />{task.due_date}</span>
          )}
        </div>
      </Link>
    </article>
  );
}
