"use client"
import React from 'react'
import { useState } from 'react';
import Image from "next/image";
import UseTimer from "@/hooks/useTimer";
import CustomTimer from "@/hooks/customTimer"
import Todo from "@/hooks/todo"
import { v4 as uuidv4 } from "uuid";

type TodoType = {
  id: string;
  title: string;
  notes:string;
  isDone: boolean;
}
const Timer = () => {
  const {mode, timeLeft, startTimer, pauseTimer, resetTimer,setFocus,setShortBreak,setLongBreak,updateDurations}= UseTimer();

  const [showCustomTimer, setShowCustomTimer] = useState(false);
  const [showTodoPanel, setShowTodoPanel] = useState(false);
  const [todos, setTodos] = useState<TodoType[]>([]);

  //format time as MM:SS
  const minutes = Math.floor(timeLeft/60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  
  const handleSaveTodo =({title, notes}: {title:string; notes:string})=>{
    setTodos([...todos,{id:uuidv4(), title, notes, isDone:false}]);
    setShowTodoPanel(false);
  };
  
  const markDone= (id:string)=>{
    setTodos((prev)=>
    prev.map((todo)=>
    todo.id===id? {...todo, isDone:true} : todo));
  };

  const deleteTodo = (id:string)=>{
    setTodos((prev)=> prev.filter((todo)=> todo.id !== id));
  };
  return(
    <div>
        <div  className="flex flex-col items-center mt-5">
      <h1 className="text-3xl">kuromiTimer</h1>
    </div>
    <div className="flex justify-center space-x-8">
     <button onClick={setFocus}>focus</button>
     <button onClick={setShortBreak}>short break</button>
     <button onClick={setLongBreak}>long break</button>
     <button onClick={() => setShowCustomTimer(true)}>Custom Timer</button>
     <button onClick={() => setShowTodoPanel(true)}>Your Todo</button>
    </div>
    <div className="text-center text-6xl mt-10">
      {formattedTime}
    </div>

    <div className="flex justify-center space-x-4">
        <button onClick={resetTimer}>reset</button>
        <button onClick={startTimer}>start</button>
        <button onClick={pauseTimer}>pause</button>
    </div>
    
    <h2 className="flex justify-center">now on {mode}</h2>
    <div className="flex justify-center">
  {mode === "focus" ? (
    <Image
      src="/assets/focus.jpeg"
      height={20}
      width={250}
      alt="Kuromi main"
    />
  ) : mode === "short break" ? (
    <Image
      src="/assets/shortbreak.jpeg"
      height={20}
      width={250}
      alt="Kuromi second"
    />
  ) :  mode === "long break" ? (
    <Image
      src="/assets/longBreak.jpeg"
      height={20}
      width={250}
      alt="Kuromi second"
    />
  ): null}
    </div>
    {/* custom timer */}
    <CustomTimer isOpen={showCustomTimer} onClose={()=>setShowCustomTimer(false)}
    onSave={({focus, shortBreak, longBreak})=>{
      updateDurations(focus, shortBreak, longBreak);
      setShowCustomTimer(false);
    }}/>
  
  {/* todo panel */}
  <Todo isOpen ={showTodoPanel} onClose={()=> setShowTodoPanel(false)} onSave={handleSaveTodo}/>
  
  {/* todo list */}
         <div className="mt-10 max-w-lg mx-auto">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="bg-yellow-200 rounded-lg p-4 mb-3 shadow-md"
          >
            <h3 className={`font-bold ${todo.isDone ? "line-through" : ""}`}>
              {todo.title}
            </h3>
            <p>{todo.notes}</p>
            <div className="flex space-x-3 mt-2">
              <button
                onClick={() => markDone(todo.id)}
                className="bg-green-500 text-white px-3 py-1 rounded">
                Done
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div> 
    </div>
  );
};

export default Timer;


