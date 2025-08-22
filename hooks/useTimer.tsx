"use client";
import {useEffect, useState} from "react";
type TimerMode = "focus"| "short break" | "long break";

// timers for different modes
 const focusTime = 25*60; // 25 minutes in seconds
 const shortBreakTime = 5*60;//5 minutes in seconds
 const longBreakTime= 15*60;//15 minutes in seconds 


const useTimer = () => {
  const [mode, setmode] = useState<TimerMode>("focus")
  const [timeLeft, setTimeLeft] = useState(focusTime);
  const [isActive, setIsActive] = useState(false);


  // function to switch modes
  const startTimer =()=>{
    setIsActive(true);
  }

  const pauseTimer =()=>{
    setIsActive(false);
  }

  const resetTimer =()=>{
    setIsActive(false);
    switch (mode){
      case "focus":
        setTimeLeft(focusTime);
        break;
        case "short break":
          setTimeLeft(shortBreakTime);
          break;
          case "long break":
            setTimeLeft(longBreakTime);
            break;
    }
  }

  // swap between pomodoro, short break and long break!
    const setPomodoro =()=>{
      setmode("focus");
      setIsActive(false);
      setTimeLeft(focusTime);
    }
    
    const setShortBreak = ()=>{
      setmode("short break");
      setIsActive(false);
      setTimeLeft(shortBreakTime);
    }

    const setLongBreak = ()=>{
      setmode("long break");
      setIsActive(false);
      setTimeLeft(longBreakTime);
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

  return (
{
 mode,
 timeLeft,
 startTimer,
 pauseTimer,
 resetTimer,
 setPomodoro,
 setShortBreak,
 setLongBreak,
 setmode,
})
}

export default useTimer;

