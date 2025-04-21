import React from "react";
import { Todo } from "./TodoList";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onUpdate,
}) => {
  const priorityColors = {
    low: "bg-blue-100",
    medium: "bg-yellow-100",
    high: "bg-red-100",
  };

  return (
    <div className={`p-4 rounded-lg shadow ${priorityColors[todo.priority]}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="w-5 h-5"
          />
          <span
            className={`${todo.completed ? "line-through text-gray-500" : ""}`}
          >
            {todo.text}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={todo.priority}
            onChange={(e) =>
              onUpdate(todo.id, {
                priority: e.target.value as Todo["priority"],
              })
            }
            className="px-2 py-1 rounded border"
          >
            <option value="low">낮음</option>
            <option value="medium">중간</option>
            <option value="high">높음</option>
          </select>
          <input
            type="date"
            value={
              todo.dueDate
                ? new Date(todo.dueDate).toISOString().split("T")[0]
                : ""
            }
            onChange={(e) =>
              onUpdate(todo.id, {
                dueDate: e.target.value ? new Date(e.target.value) : undefined,
              })
            }
            className="px-2 py-1 rounded border"
          />
          <button
            onClick={() => onDelete(todo.id)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};
