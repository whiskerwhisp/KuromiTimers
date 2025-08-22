 "use client";
import React from 'react'
import useTimer from "@/hooks/useTimer";

const Timer = () => {


  const {mode, timeLeft, startTimer, pauseTimer, resetTimer,setPomodoro,setShortBreak,setLongBreak}= useTimer();
 

  //format time as MM:SS
  const minutes = Math.floor(timeLeft/60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  return (
    <div>
        <div  className="flex flex-col items-center mt-5">
      <h1 className="text-3xl">kuromiTimer</h1>
   
      <h2>now on {mode}</h2>
    </div>
    <div className="flex justify-center space-x-8">
     <button onClick={setPomodoro}>pomodoro</button>
     <button onClick={setShortBreak}>short break</button>
     <button onClick={setLongBreak}>long break</button>
     
    </div>
    <div className="text-center text-6xl mt-10">
      {formattedTime}
    </div>

    <div className="flex justify-center space-x-4">
        <button onClick={resetTimer}>reset</button>
        <button onClick={startTimer}>start</button>
        <button onClick={pauseTimer}>pause</button>
    </div>
    
    </div>
  )
}

export default Timer;


