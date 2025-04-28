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
    low: { color: "bg-blue-100 border-blue-500", text: "낮음" },
    medium: { color: "bg-yellow-100 border-yellow-500", text: "중간" },
    high: { color: "bg-red-100 border-red-500", text: "높음" },
  };

  return (
    <div
      className={`${
        priorityConfig[todo.priority].color
      } border-2 border-black rounded-xl p-4 transition-all duration-200 hover:shadow-md`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="w-5 h-5 rounded border-gray-800 text-yellow-500 focus:ring-yellow-500 transition-all duration-200"
          />
          <span
            className={`flex-1 text-black text-lg font-bold ${
              todo.completed ? "line-through text-gray-600" : ""
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
            className="px-3 py-1.5 rounded-lg border-2 border-black text-sm font-bold focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white"
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
            className="px-3 py-1.5 rounded-lg border-2 border-black text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white"
          />

          <button
            onClick={() => onDelete(todo.id)}
            className="px-3 py-1.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-200 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};
