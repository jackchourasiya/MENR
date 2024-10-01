import { useDispatch, useSelector } from "react-redux"
// import increment from '../redux/dataslice';
import { increment } from "../redux/dataslice"

const Counter = () => {
    const dispatch  = useDispatch()
    const data      = useSelector((state)=>state.counter.value)

    return(
        <>
            <h1>{data}</h1>
            <button onClick={()=>dispatch(increment())}>increment</button>
        </>
    )
}
export default Counter;