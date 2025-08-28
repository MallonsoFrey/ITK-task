import { useState } from "react";

type Props = { onAdd: (text: string) => void };

export default function TodoForm({ onAdd }: Props) {
  const [newTask, setNewTask] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    onAdd(newTask);
    setNewTask("");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 p-6 bg-black text-white rounded shadow-md w-full max-w-sm"
    >
      <h2 className="text-xl">Какая задача на повестке?</h2>
      <input
        type="text"
        className="border-1 rounded p-2 mt-3"
        placeholder="Новая задача"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button type="submit">Добавить</button>
    </form>
  );
}
