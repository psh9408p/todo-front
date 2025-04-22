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
    <div className="flex justify-center gap-2">
      {[
        { value: "all", label: "전체" },
        { value: "active", label: "진행중" },
        { value: "completed", label: "완료" },
      ].map((filter) => (
        <button
          key={filter.value}
          className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
            currentFilter === filter.value
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => onFilterChange(filter.value as typeof currentFilter)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};
