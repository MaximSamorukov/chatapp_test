import { createSlice } from '@reduxjs/toolkit'


export type TodoItem = {
  id: number;
  title: string;
  isDone: boolean;
}

type TodosState = {
  todos: TodoItem[]
}

const initialState: TodosState = {
  todos: [],
}

export const todoSlice = createSlice({
  name: 'todo',
    initialState,
  reducers: {
    addTodo: (state, action) => {
      const item = { id: Date.now(), title: action.payload.title, isDone: false}
      console.log(item)
      state.todos = [item, ...state.todos]
    },
    removeTodo: (state, action) => {
      const id = action.payload.id;
      state.todos = state.todos.filter((i) => i.id !== id);
    },
    toggleTodoState: (state, action) => {
      console.log(action)
      state.todos = state.todos.map((i) => {
        if (i.id === action.payload.id) {
          return {
            ...i,
            isDone: !i.isDone
          }
        } else {
          return i
        }
      })
    },
    updateTodo: (state, action) => {
      state.todos = state.todos.map((i) => {
        if (i.id === action.payload.id) {
          return {
            ...i,
            ...action.payload
          }
        } else {
          return i
        }
      })
    }
  },
})

export const { addTodo, removeTodo, toggleTodoState, updateTodo } = todoSlice.actions

export default todoSlice.reducer