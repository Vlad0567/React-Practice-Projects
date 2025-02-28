import { useEffect, useState } from "react"


const CurTime = () => {
    const [time,setTime] = useState(new Date());

    useEffect(()=>{

      const interval = setInterval(()=>{
        setTime(new Date())
      },1000)
    
      return ()=> clearInterval(interval);
    },[])
    
    return (
        <div>
          <h2>Часы</h2>
            <p>{time.toLocaleTimeString()}</p>
        </div>
    )
}

export default CurTime