import { useMemo, useState } from "react";
import { Check, Plus, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { TaskCard } from "../components/TaskCard";
import { EmptyState, ErrorState, LoadingState, PageHeader, SearchField, StatCard } from "../components/ui";
import { updateTask } from "../lib/tasks";
import type { Task } from "../types";
import { useTasks } from "../hooks/useTasks";

type Filter = "all" | "todo" | "done";

export function TasksPage() {
  const { tasks, loading, error, refresh } = useTasks();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [actionError, setActionError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const doneCount = tasks.filter((task) => task.status === "done").length;
  const visibleTasks = useMemo(
    () =>
      tasks.filter((task) => {
        const matchesText = `${task.title} ${task.description}`.toLowerCase().includes(query.toLowerCase());
        return matchesText && (filter === "all" || task.status === filter);
      }),
    [tasks, query, filter],
  );

  async function toggleTask(task: Task) {
    setUpdatingId(task.id);
    setActionError("");
    try {
      await updateTask(task.id, {
        title: task.title,
        description: task.description,
        status: task.status === "done" ? "todo" : "done",
        priority: task.priority,
        due_date: task.due_date,
      });
      await refresh();
    } catch (cause) {
      setActionError(cause instanceof Error ? cause.message : "상태를 변경하지 못했습니다.");
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="나의 워크스페이스"
        title={<>오늘도 <span className="title-accent">가볍게</span> 시작해요 <span className="title-sparkle">✦</span></>}
        description="할 일을 정리하고, 하나씩 완성해 보세요."
        action={<Link className="button button-primary" to="/tasks/new"><Plus size={17} />새 태스크</Link>}
      />
      <section className="stats-grid" aria-label="태스크 요약">
        <StatCard label="전체 태스크" value={tasks.length} detail="차근차근 쌓아가는 중" />
        <StatCard label="완료했어요" value={doneCount} detail={tasks.length ? `${Math.round((doneCount / tasks.length) * 100)}% 달성` : "첫 태스크를 시작해 보세요"} tone="green" />
        <StatCard label="남은 할 일" value={tasks.length - doneCount} detail="오늘의 작은 목표" tone="orange" />
      </section>
      <section className="tasks-section">
        <div className="section-title-row">
          <div><h2>나의 태스크</h2><span className="count-chip">{tasks.length}</span></div>
          <span className="today-note"><Sparkles size={14} /> 오늘도 잘하고 있어요</span>
        </div>
        <div className="task-toolbar">
          <SearchField value={query} onChange={(event) => setQuery(event.target.value)} />
          <div className="filter-tabs" role="group" aria-label="상태 필터">
            {([["all", "전체"], ["todo", "진행 전"], ["done", "완료"]] as const).map(([value, label]) => (
              <button key={value} className={filter === value ? "selected" : ""} onClick={() => setFilter(value)}>
                {value === "done" && <Check size={13} />}{label}
              </button>
            ))}
          </div>
        </div>
        {actionError && <div className="inline-error" role="alert">{actionError}</div>}
        {loading ? <LoadingState /> : error ? <ErrorState message={error} onRetry={() => void refresh()} /> : visibleTasks.length ? (
          <div className="task-list">
            {visibleTasks.map((task) => (
              <div className={updatingId === task.id ? "task-updating" : ""} key={task.id}>
                <TaskCard task={task} onToggle={toggleTask} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title={query || filter !== "all" ? "검색 결과가 없어요" : "아직 태스크가 없어요"}
            description={query || filter !== "all" ? "검색어나 필터를 바꿔 다시 찾아보세요." : "머릿속에 있는 일을 꺼내 첫 태스크를 만들어 보세요."}
            action={query || filter !== "all" ? undefined : <Link className="button button-primary" to="/tasks/new"><Plus size={16} /> 첫 태스크 만들기</Link>}
          />
        )}
      </section>
    </>
  );
}
