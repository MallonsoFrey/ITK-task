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
    const res = await api.post("/todos", { title }); // <- title вместо text
    return res.data; // сервер вернёт созданную задачу
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
  return id; // просто возвращаем id удалённой
});

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchTodos
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
      // addTodo
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.unshift(action.payload);
      })
      // toggleTodo
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const idx = state.todos.findIndex((t) => t.id === action.payload.id);
        if (idx !== -1) state.todos[idx] = action.payload;
      })
      // deleteTodo
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((t) => t.id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
