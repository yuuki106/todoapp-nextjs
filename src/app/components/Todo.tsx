"use client";

import { deleteTodo, editTodo } from "@/api";
import { Task } from "@/types";
import { Input } from "postcss";
import React, { useEffect, useRef, useState } from "react";

interface TodoProps {
  todo: Task;
}

const Todo = ({ todo }: TodoProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const [isEditting, setIsEditing] = useState(false);
  const [editedTaskTitle, setEditedTaskTitle] = useState(todo.text);

  useEffect(()=>{
    if(isEditting){
      ref.current?.focus();
    }
  },[isEditting]);
  const handleIsEdit = async () => {
    setIsEditing(true);
  };
  const handleSave = async () => {
    await editTodo(todo.id, editedTaskTitle);
    setIsEditing(false);
  };
  const handleDelete =async()=>{
    await deleteTodo(todo.id);
  };
  return (
    <li key={todo.id} className="flex justify-between p-4 bg-white border-l-4 border-blue-500 rounded shadow">
      {isEditting ? (
        <input
        ref={ref}
          type="text"
          className="mr-2 py-1 px-2 rounded border-gray-400 border"
          value={editedTaskTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedTaskTitle(e.target.value)}
        />
      ) : (
        <span>{todo.text}</span>
      )}
      <div>
        {isEditting ? (
          <button className="text-blue-500 mr-3" onClick={handleSave}>
            Save
          </button>
        ) : (
          <button className="text-green-500 mr-3" onClick={handleIsEdit}>Edit</button>
        )}

        <button className="text-red-500" onClick={handleDelete}>Delete</button>
      </div>
    </li>
  );
};

export default Todo;