import { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTodos,
  toggleTodo,
  addTodo,
  deleteTodo,
} from "../store/todoSlice";
import type { RootState, AppDispatch } from "../store/store";

export default function TodoList() {
  const dispatch: AppDispatch = useDispatch();
  const { todos, loading, error } = useSelector(
    (state: RootState) => state.todos
  );
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "active") return !todo.completed;
    return todo.completed;
  });

  const handleAdd = async (title: string) => {
    const result = await dispatch(addTodo(title)).unwrap();
    console.log("Добавлена задача:", result);
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="flex flex-col items-center">
      <TodoForm onAdd={handleAdd} />
      <div className="flex justify-between items-center p-2 text-white">
        <select
          className="bg-black"
          name="select"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Все</option>
          <option value="active">Активные</option>
          <option value="completed">Завершенные</option>
        </select>
      </div>
      <ul className="flex flex-col gap-4 p-6 bg-black text-white rounded shadow-md w-full max-w-sm">
        {todos.length === 0 && <p>Пока что здесь пусто</p>}
        {filteredTodos.map((item) => (
          <TodoItem
            key={item.id}
            id={item.id}
            title={item.title}
            completed={item.completed}
            onToggle={(id) =>
              dispatch(toggleTodo({ id, completed: item.completed }))
            }
            onDelete={() => dispatch(deleteTodo(item.id))}
          />
        ))}
      </ul>
    </div>
  );
}
