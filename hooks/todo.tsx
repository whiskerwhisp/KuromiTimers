import React from "react";
import { useState } from "react";

interface TodoProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: { title: string; notes: string }) => void;
}

const Todo: React.FC<TodoProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 text-black flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold">✕</button>

        <h2 className="text-2xl font-bold text-red-600 mb-6">
          Add New Task
        </h2>

        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => {
              onSave({ title, notes });
              setTitle("");
              setNotes("");
            }}
            className="bg-red-500 text-white font-bold px-6 py-2 rounded hover:bg-red-600 transition">Save</button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
