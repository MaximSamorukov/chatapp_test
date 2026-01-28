import type { RootState } from "./store";

export const selector = (s: RootState) => s.todos.todos;
export const filterSelector = (s: RootState) => s.todos.filter;
export const filteredTodosSelector = (s: RootState) => s.todos.filteredTodos;
