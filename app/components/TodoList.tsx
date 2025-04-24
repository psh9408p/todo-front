"use client";
import React, { useState, useEffect } from "react";
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

// 백엔드 API 주소
const API_URL = "http://localhost:3000";

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 토큰 가져오기 (로그인 구현 후 사용)
  const getToken = () => {
    return localStorage.getItem("token") || "";
  };

  // API 요청 헤더
  const getHeaders = () => {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    };
  };

  // 할 일 목록 불러오기
  const fetchTodos = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/todos`, {
        headers: getHeaders(),
      });

      if (!response.ok) {
        throw new Error("할 일을 불러오는데 실패했습니다.");
      }

      const data = await response.json();
      // 백엔드 데이터 형식을 프론트엔드 형식으로 변환
      const formattedTodos: Todo[] = data.map((item: any) => ({
        id: item.id.toString(),
        text: item.content,
        completed: item.completed || false,
        priority: item.priority || "medium",
        dueDate: item.dueDate ? new Date(item.dueDate) : undefined,
      }));

      setTodos(formattedTodos);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
      );
      console.error("Todo 불러오기 오류:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // 컴포넌트 마운트 시 할 일 목록 불러오기
  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (text: string) => {
    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ content: text }),
      });

      if (!response.ok) {
        throw new Error("할 일을 추가하는데 실패했습니다.");
      }

      const newTodoFromServer = await response.json();

      // 서버 응답을 프론트엔드 형식으로 변환
      const newTodo: Todo = {
        id: newTodoFromServer.id.toString(),
        text: newTodoFromServer.content,
        completed: false,
        priority: "medium",
      };

      setTodos([...todos, newTodo]);
    } catch (err) {
      console.error("할 일 추가 오류:", err);
      alert(
        err instanceof Error ? err.message : "할 일을 추가하는데 실패했습니다."
      );
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/todos/${id}/toggle`, {
        method: "PATCH",
        headers: getHeaders(),
      });

      if (!response.ok) {
        throw new Error("할 일 상태를 변경하는데 실패했습니다.");
      }

      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    } catch (err) {
      console.error("할 일 상태 변경 오류:", err);
      alert(
        err instanceof Error ? err.message : "할 일 상태 변경에 실패했습니다."
      );
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });

      if (!response.ok) {
        throw new Error("할 일을 삭제하는데 실패했습니다.");
      }

      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error("할 일 삭제 오류:", err);
      alert(err instanceof Error ? err.message : "할 일 삭제에 실패했습니다.");
    }
  };

  const updateTodo = async (id: string, updates: Partial<Todo>) => {
    try {
      // 백엔드 API 형식에 맞게 데이터 변환
      const updatedFields: Record<string, any> = {};

      if ("text" in updates) {
        updatedFields.content = updates.text;
      }

      if ("completed" in updates) {
        updatedFields.completed = updates.completed;
      }

      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify(updatedFields),
      });

      if (!response.ok) {
        throw new Error("할 일을 업데이트하는데 실패했습니다.");
      }

      setTodos(
        todos.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
      );
    } catch (err) {
      console.error("할 일 업데이트 오류:", err);
      alert(
        err instanceof Error ? err.message : "할 일 업데이트에 실패했습니다."
      );
    }
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

        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">로딩 중...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">
            <p>{error}</p>
            <button
              onClick={fetchTodos}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              다시 시도
            </button>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};
