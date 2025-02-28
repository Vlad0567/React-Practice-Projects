import { useEffect, useState } from "react"


const StopWatch = () => {
  const [time,setTime] = useState<number>(0);
  const [running,setRunning] = useState<boolean>(false);
  const [intervals,setIntervals] = useState<{round: number,roundTime: number, totalTime: number}[]>([])
  const [started,setStarted] = useState<boolean>(false);

  useEffect(()=>{
    if(!running) return

    const interval = setInterval(()=>{
      setTime((prev)=>prev+10)
    },10)
  
    return ()=> clearInterval(interval);
  },[running])

  const reset = () => {
    setRunning(false)
    setTime(0)
    setIntervals([])
    setStarted(false)
  }

  const startTimer = () =>{
    setStarted(true)
    setRunning(true)
  }

  const intervalAdd = () => {
    setIntervals((prev) => {
      const lastRound = prev.length > 0 ? prev[prev.length - 1].totalTime : 0;
      return [...prev,
        {
          round: prev.length+1, 
          roundTime: time - lastRound ,
          totalTime: time
        }]
    })
  }
  
  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const millis = Math.round((milliseconds % 1000)/10);

    const formattedHours = hours > 0 ? `${hours}:` : "";
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");
    const formattedMilliseconds = millis.toString().padStart(2, "0");

    return `${formattedHours}${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
  };


  return (
    <div>
      <h2>Секундомер</h2>
      <p>{formatTime(time)}</p>
      {!started ? (
        <button onClick={() => startTimer()}>Start</button>
      ) : (
        <div>
          {running ? ( 
            <button onClick={() => setRunning(false)}>Stop</button>
          ) : (
            <button onClick={() => setRunning(true)}>Continue</button>
          )}

          <button onClick={() => reset()}>Reset</button>
          <button onClick={() => intervalAdd()}>Interval</button>
        </div>
      )}
      
      {intervals.length > 0 && (
        <table style={{ marginTop: "20px", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Круг</th>
              <th>Время круга</th>
              <th>Общее время</th>
            </tr>
          </thead>
          <tbody>
            {intervals.map(({ round, roundTime, totalTime }) => (
              <tr key={`interval-${round}`}>
                <td style={{ textAlign: "center" }}>{round}</td>
                <td>{formatTime(roundTime)}</td>
                <td>{formatTime(totalTime)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default StopWatch