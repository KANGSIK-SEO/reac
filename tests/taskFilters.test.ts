import { filterTasks } from "../src/lib/taskFilters";
import type { Task } from "../src/types";

const tasks: Task[] = [
  {
    id: "1",
    title: "주간 회고",
    description: "이번 주 목표를 돌아보기",
    status: "done",
    priority: "medium",
    due_date: null,
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "2",
    title: "책 읽기",
    description: "React 책 10쪽 읽기",
    status: "todo",
    priority: "low",
    due_date: null,
    created_at: "2026-01-02T00:00:00.000Z",
    updated_at: "2026-01-02T00:00:00.000Z",
  },
];

function assertEqualIds(actual: Task[], expected: string[], testName: string) {
  const actualIds = actual.map((task) => task.id).join(",");
  const expectedIds = expected.join(",");
  if (actualIds !== expectedIds) {
    throw new Error(`${testName}: expected [${expectedIds}], received [${actualIds}]`);
  }
}

assertEqualIds(filterTasks(tasks), ["1", "2"], "empty query includes all tasks");
assertEqualIds(filterTasks(tasks, "  주간  "), ["1"], "search trims whitespace");
assertEqualIds(filterTasks(tasks, "REACT"), ["2"], "search is case-insensitive");
assertEqualIds(filterTasks(tasks, "목표", "done"), ["1"], "search matches descriptions and status");
assertEqualIds(filterTasks(tasks, "", "todo"), ["2"], "status filter selects pending tasks");

console.log("Task filter tests passed.");
