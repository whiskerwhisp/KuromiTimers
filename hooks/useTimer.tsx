"use client";
import {useEffect, useState} from "react";
type TimerMode = "focus"| "short break" | "long break";

const useTimer = () => {
  const [duration, setDuration] = useState({
      focus : 25*60,
      shortBreak : 5*60,
      longBreak: 15*60
  })
  const [mode, setmode] = useState<TimerMode>("focus")
  const [timeLeft, setTimeLeft] = useState(duration.focus);
  const [isActive, setIsActive] = useState(false);

  // function to switch modes
  const startTimer =()=>{setIsActive(true);}
  const pauseTimer =()=>{setIsActive(false);}

  const resetTimer =()=>{setIsActive(false);
    switch (mode){
      case "focus":
        setTimeLeft(duration.focus);
        break;
        case "short break":
          setTimeLeft(duration.shortBreak);
          break;
          case "long break":
            setTimeLeft(duration.longBreak);
            break;
    }
  }

  // swap between pomodoro, short break and long break!
    const setFocus =()=>{
      setmode("focus");
      setIsActive(false);
      setTimeLeft(duration.focus);
    }
    
    const setShortBreak =()=>{
      setmode("short break");
      setIsActive(false);
      setTimeLeft(duration.shortBreak);
    }

    const setLongBreak =()=>{
      setmode("long break");
      setIsActive(false);
      setTimeLeft(duration.longBreak);
    }

useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval!);
            setIsActive(false);

            const audio = new Audio("/assets/pomodoroOver.mp3");
            audio.play();
            return 0; 
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  //custom timer logic
  const updateDurations = (focus:number, shortBreak:number, longBreak:number)=>{
    setDuration({
      focus: focus*60,
      shortBreak: shortBreak*60,
      longBreak: longBreak*60
    });
  
  //final add of custom values
  switch(mode){
    case "focus":
      setTimeLeft(focus*60);
      break;
       case "short break":
      setTimeLeft(shortBreak*60);
      break;
       case "long break":
      setTimeLeft(longBreak*60);
      break;
  }
  }
  return (
{
 mode,
 timeLeft,
 startTimer,
 pauseTimer,
 resetTimer,
 setFocus,
 setShortBreak,
 setLongBreak,
 updateDurations,
})
}

export default useTimer;

