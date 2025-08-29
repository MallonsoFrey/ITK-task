import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../src/api/axiosInstance";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
    todos: [],
    loading: false,
    error: null,
};

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
    const res = await api.get("/todos");
    return res.data;
});

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (title: string) => {
    const res = await api.post("/todos", { title });
    return res.data;
  }
);

export const toggleTodo = createAsyncThunk(
  "todos/toggleTodo",
  async (todo: { id: number; completed: boolean }) => {
    const res = await api.put(`/todos/${todo.id}`, { completed: !todo.completed });
    return res.data;
  }
);

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id: number) => {
  await api.delete(`/todos/${id}`);
  return id; 
});

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка загрузки";
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.unshift(action.payload);
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.todos[index] = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((t) => t.id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
