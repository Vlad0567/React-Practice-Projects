import { useEffect, useState } from "react"


const Timer = () => {
  const [time,setTime] = useState<number>(0);
  const [running,setRunning] = useState<boolean>(false);
  const [started,setStarted] = useState<boolean>(false);
  const [inputTime, setInputTime] = useState<string>("00:00:00");

  useEffect(()=>{
    if(!running) return

    if(time <= 0) {
      reset()
      return alert('Время вышло')
    }
    const interval = setInterval(()=>{
      setTime((prev)=>prev-1000)
    },1000)
  
    return ()=> clearInterval(interval)
  },[running,time])

  const reset = () => {
    setRunning(false)
    setTime(0)
    setInputTime("00:00:00")
    setStarted(false)
  }

  const startTimer = () =>{
    setStarted(true)
    setRunning(true)
  }

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputTime(value);

    const [hours, minutes, seconds] = value.split(":").map(Number);
    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) return;
    const totalMilliseconds = (hours * 3600 + minutes * 60 + seconds) * 1000;
    setTime(totalMilliseconds);
  }

  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  return (
    <div>
      <h2>Таймер</h2>
      {!started ? (
        <div>
          <input type="time" step="1" value={inputTime} onChange={handleTimeChange} />
          <button onClick={() => startTimer()}>Start</button>
        </div>
      ) : (
        <div>
          <p>{formatTime(time)}</p>
          {running ? ( 
            <button onClick={() => setRunning(false)}>Stop</button>
          ) : (
            <button onClick={() => setRunning(true)}>Continue</button>
          )}
          <button onClick={() => reset()}>Reset</button>
        </div>
      )}
      
    </div>
  )
}

export default Timer