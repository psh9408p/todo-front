"use client";
import React, { useState } from "react";

interface AddTodoProps {
  onAdd: (text: string) => void;
}

export const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="새로운 할 일을 입력하세요"
        className="flex-1 px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-500 font-bold"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-all duration-200 font-bold shadow-sm border-2 border-black"
      >
        추가하기
      </button>
    </form>
  );
};
