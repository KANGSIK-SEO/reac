import { Link } from "react-router-dom";
import { TaskCard } from "../components/TaskCard";
import { EmptyState, ErrorState, LoadingState, PageHeader } from "../components/ui";
import { useTasks } from "../hooks/useTasks";
import { filterTasks } from "../lib/taskFilters";

export function CompletedTasksPage() {
  const { tasks, loading, error, refresh } = useTasks();
  const completedTasks = filterTasks(tasks, "", "done");

  return (
    <>
      <PageHeader
        eyebrow="작은 성취"
        title="완료한 태스크"
        description="해낸 일을 돌아보고, 다음 한 걸음을 준비해 보세요."
        action={<Link className="button button-secondary" to="/tasks">전체 태스크</Link>}
      />
      <section className="tasks-section">
        <div className="section-title-row">
          <div><h2>나의 성취</h2><span className="count-chip">{completedTasks.length}</span></div>
        </div>
        {loading ? <LoadingState label="완료한 태스크를 불러오고 있어요" /> : error ? (
          <ErrorState message={error} onRetry={() => void refresh()} />
        ) : completedTasks.length ? (
          <div className="task-list">
            {completedTasks.map((task) => <TaskCard key={task.id} task={task} />)}
          </div>
        ) : (
          <EmptyState
            title="아직 완료한 태스크가 없어요"
            description="태스크를 완료하면 이곳에서 다시 확인할 수 있어요."
            action={<Link className="button button-primary" to="/tasks">태스크 확인하기</Link>}
          />
        )}
      </section>
    </>
  );
}
