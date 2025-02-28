import Timer from "./Timer"
import StopWatch from "./StopWatch"
import CurTime from "./CurTime"
import './Time.css'

const Time = () => {
  return (
    <div>
        <CurTime />
        <StopWatch />
        <Timer />
    </div>
  )
}

export default Time