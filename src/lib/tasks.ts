import { supabase } from "./supabase";
import type { Task, TaskInput } from "../types";

function client() {
  if (!supabase) {
    throw new Error(
      "Supabase 설정이 없습니다. .env 파일에 프로젝트 URL과 anon key를 입력해 주세요.",
    );
  }
  return supabase;
}

export async function listTasks(): Promise<Task[]> {
  const { data, error } = await client()
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function getTask(id: string): Promise<Task> {
  const { data, error } = await client()
    .from("tasks")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export async function createTask(input: TaskInput): Promise<Task> {
  const { data, error } = await client()
    .from("tasks")
    .insert(input)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateTask(id: string, input: TaskInput): Promise<Task> {
  const { data, error } = await client()
    .from("tasks")
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteTask(id: string): Promise<void> {
  const { error } = await client().from("tasks").delete().eq("id", id);
  if (error) throw error;
}
