"use client";
import React, { useState } from "react";
import { TodoItem } from "./TodoItem";
import { AddTodo } from "./AddTodo";
import { TodoFilter } from "./TodoFilter";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate?: Date;
}

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      priority: "medium",
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Todo List</h1>
          <p className="text-gray-600">오늘의 할 일을 관리하세요</p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <AddTodo onAdd={addTodo} />
        </div>

        <TodoFilter currentFilter={filter} onFilterChange={setFilter} />

        <div className="space-y-4">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              할 일이 없습니다. 새로운 할 일을 추가해보세요!
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onUpdate={updateTodo}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
