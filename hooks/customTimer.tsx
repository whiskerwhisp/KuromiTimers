import React, { useState } from "react";

interface CustomTimerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (durations: { focus: number; shortBreak: number; longBreak: number }) => void;
}

const CustomTimer: React.FC<CustomTimerProps> = ({ isOpen, onClose, onSave }) => {
  const [focus, setfocus] = useState<number>(25);
  const [shortBreak, setShortBreak] = useState<number>(5);
  const [longBreak, setLongBreak] = useState<number>(15);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 text-black flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold">✕</button>

        <h2 className="text-2xl font-bold text-red-600 mb-6">
          Enter Custom Timer
        </h2>

        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Focus</label>
            <input
              type="number"
              min={1}
              value={focus}
              onChange={(e) => setfocus(parseInt(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Short Break</label>
            <input
              type="number"
              min={1}
              value={shortBreak}
              onChange={(e) => setShortBreak(parseInt(e.target.value))}
              
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"/>
          </div>

          <div>
            <label className="block font-semibold mb-1">Long Break</label>
            <input
              type="number"
              min={1}
              value={longBreak}
              onChange={(e) => setLongBreak(parseInt(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => onSave({ focus, shortBreak, longBreak })}
            className="bg-red-500 text-white font-bold px-6 py-2 rounded hover:bg-red-600 transition">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomTimer;