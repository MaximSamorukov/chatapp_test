import type { RootState } from "./store";

export function selector(s: RootState){
  return s.todos.todos
}