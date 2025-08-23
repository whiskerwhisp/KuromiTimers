 "use client";
import React from 'react'
import { useState } from 'react';
import Image from 'next/image';
import UseTimer from "@/hooks/useTimer";
import CustomTimer from "@/hooks/customTimer"

const Timer = () => {
  const {mode, timeLeft, startTimer, pauseTimer, resetTimer,setFocus,setShortBreak,setLongBreak,updateDurations}= UseTimer();
 
  const [showCustomTimer, setShowCustomTimer] = useState(false);
  //format time as MM:SS
  const minutes = Math.floor(timeLeft/60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  return(
    <div>
        <div  className="flex flex-col items-center mt-5">
      <h1 className="text-3xl">kuromiTimer</h1>
   
      <h2>now on {mode}</h2>
    </div>
    <div className="flex justify-center space-x-8">
     <button onClick={setFocus}>focus <Image src={"/assets/kuromiMain.jpeg"} height={20} width={60} alt="Kuromi main"/></button>
     <button onClick={setShortBreak}>short break</button>
     <button onClick={setLongBreak}>long break</button>
     <button onClick={() => setShowCustomTimer(true)}>Custom Timer</button>
     <button>your todo</button>
    </div>
    <div className="text-center text-6xl mt-10">
      {formattedTime}
    </div>

    <div className="flex justify-center space-x-4">
        <button onClick={resetTimer}>reset</button>
        <button onClick={startTimer}>start</button>
        <button onClick={pauseTimer}>pause</button>
    </div>
    <CustomTimer isOpen={showCustomTimer} onClose={()=>setShowCustomTimer(false)}
    onSave={({focus, shortBreak, longBreak})=>{
      updateDurations(focus, shortBreak, longBreak);
      setShowCustomTimer(false);
    }}/>
    </div>
  );
};

export default Timer;


