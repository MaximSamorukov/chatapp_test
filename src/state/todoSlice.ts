import { createSlice } from "@reduxjs/toolkit";
import { FILTER, LOCAL_STORAGE_KEY } from "../constants";

export type FilterType = "all" | "done" | "not_done";

export type TodoItem = {
  id: number;
  title: string;
  isDone: boolean;
};

type TodosState = {
  todos: TodoItem[];
  filter: FilterType;
  filteredTodos: TodoItem[];
};

const emptyObject = {
  todos: [],
  filter: FILTER.ALL,
  filteredTodos: [],
};

const loadTodosFromStorage = () => {
  try {
    const savedTodosState = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedTodosState ? JSON.parse(savedTodosState) : emptyObject;
  } catch (error) {
    console.error("Ошибка загрузки из localStorage:", error);
    return emptyObject;
  }
};

const initialState: TodosState = loadTodosFromStorage();

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const item = {
        id: Date.now(),
        title: action.payload.title,
        isDone: false,
      };
      state.todos = [item, ...state.todos];
      if (state.filter === FILTER.ALL || state.filter === FILTER.NOT_DONE) {
        state.filteredTodos = [item, ...state.filteredTodos];
      }
    },
    removeTodo: (state, action) => {
      const id = action.payload.id;
      state.todos = state.todos.filter((i) => i.id !== id);
      state.filteredTodos = state.filteredTodos.filter((i) => i.id !== id);
    },
    toggleTodoState: (state, action) => {
      state.todos = state.todos.map((i) => {
        if (i.id === action.payload.id) {
          return {
            ...i,
            isDone: !i.isDone,
          };
        } else {
          return i;
        }
      });
      state.filteredTodos = state.filteredTodos
        .map((i) => {
          if (i.id === action.payload.id) {
            return {
              ...i,
              isDone: !i.isDone,
            };
          } else {
            return i;
          }
        })
        .filter((i) => {
          if (state.filter === FILTER.ALL) {
            return true;
          }
          const isDone = state.filter === FILTER.DONE;
          return i.isDone === isDone;
        });
    },
    updateTodo: (state, action) => {
      state.todos = state.todos.map((i) => {
        if (i.id === action.payload.id) {
          return {
            ...i,
            ...action.payload,
          };
        } else {
          return i;
        }
      });
      state.filteredTodos = state.filteredTodos.map((i) => {
        if (i.id === action.payload.id) {
          return {
            ...i,
            ...action.payload,
          };
        } else {
          return i;
        }
      });
    },
    toggleDoneFilter: (state) => {
      if (state.filter === FILTER.DONE) {
        state.filter = FILTER.ALL;
        state.filteredTodos = state.todos;
      } else {
        state.filter = FILTER.DONE;
        state.filteredTodos = state.todos.filter((i) => i.isDone);
      }
    },
    toggleNotDoneFilter: (state) => {
      if (state.filter === FILTER.NOT_DONE) {
        state.filter = FILTER.ALL;
        state.filteredTodos = state.todos;
      } else {
        state.filter = FILTER.NOT_DONE;
        state.filteredTodos = state.todos.filter((i) => !i.isDone);
      }
    },
    setFilteredItemsWithNewOrder: (state, action) => {
      const { items } = action.payload;
      state.filteredTodos = items;
    },
  },
});

export const {
  addTodo,
  removeTodo,
  toggleTodoState,
  updateTodo,
  toggleDoneFilter,
  toggleNotDoneFilter,
  setFilteredItemsWithNewOrder,
} = todoSlice.actions;

export default todoSlice.reducer;
