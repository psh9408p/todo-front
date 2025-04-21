import React from "react";

interface TodoFilterProps {
  currentFilter: "all" | "active" | "completed";
  onFilterChange: (filter: "all" | "active" | "completed") => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  currentFilter,
  onFilterChange,
}) => {
  return (
    <div className="flex justify-center space-x-4 my-6">
      <button
        className={`px-4 py-2 rounded ${
          currentFilter === "all"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
        onClick={() => onFilterChange("all")}
      >
        전체
      </button>
      <button
        className={`px-4 py-2 rounded ${
          currentFilter === "active"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
        onClick={() => onFilterChange("active")}
      >
        진행중
      </button>
      <button
        className={`px-4 py-2 rounded ${
          currentFilter === "completed"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
        onClick={() => onFilterChange("completed")}
      >
        완료
      </button>
    </div>
  );
};
