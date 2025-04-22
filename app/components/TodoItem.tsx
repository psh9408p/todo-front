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
  const priorityConfig = {
    low: { color: "bg-blue-50 border-blue-200", text: "낮음" },
    medium: { color: "bg-yellow-50 border-yellow-200", text: "중간" },
    high: { color: "bg-red-50 border-red-200", text: "높음" },
  };

  return (
    <div
      className={`${
        priorityConfig[todo.priority].color
      } border rounded-xl p-4 transition-all duration-200 hover:shadow-md`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-all duration-200"
          />
          <span
            className={`flex-1 text-gray-800 text-lg ${
              todo.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {todo.text}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={todo.priority}
            onChange={(e) =>
              onUpdate(todo.id, {
                priority: e.target.value as Todo["priority"],
              })
            }
            className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
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
            className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />

          <button
            onClick={() => onDelete(todo.id)}
            className="px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};
