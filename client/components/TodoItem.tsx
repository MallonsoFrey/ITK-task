import React from "react";

type TodoItemProps = {
  id: number;
  title: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  title,
  completed,
  onToggle,
  onDelete,
}) => (
  <li
    className={`flex items-center justify-between p-4 mb-2 rounded shadow-sm bg-white text-black transition-all ${
      completed ? "opacity-60 line-through" : ""
    }`}
  >
    <button
      aria-label={completed ? "Mark as incomplete" : "Mark as complete"}
      onClick={() => onToggle(id)}
      className={`mr-3 w-6 h-6 flex items-center justify-center rounded-full border-2 transition-colors ${
        completed
          ? "bg-green-500 border-green-500"
          : "bg-transparent border-gray-300"
      }`}
    >
      {completed && (
        <svg
          className="w-4 h-4 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
      )}
    </button>
    <span className="flex-1 text-base break-words">{title}</span>
    <button
      aria-label="Delete todo"
      onClick={() => onDelete(id)}
      className="ml-3 text-red-500 hover:text-red-700 transition-colors"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </li>
);

export default TodoItem;
