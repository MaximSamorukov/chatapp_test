import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todoSlice";
import { LOCAL_STORAGE_KEY } from "../constants";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.todos));
  } catch (error) {
    console.error("Ошибка сохранения в localStorage:", error);
  }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
