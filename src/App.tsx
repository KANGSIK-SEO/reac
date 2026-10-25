import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { TaskCreatePage } from "./pages/TaskCreatePage";
import { TaskDetailPage } from "./pages/TaskDetailPage";
import { TaskEditPage } from "./pages/TaskEditPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { TasksPage } from "./pages/TasksPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/tasks" replace />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/tasks/new" element={<TaskCreatePage />} />
        <Route path="/tasks/:id/edit" element={<TaskEditPage />} />
        <Route path="/tasks/:id" element={<TaskDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
