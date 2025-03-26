import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { calculateDiff } from "./utils";
const defaultRemainigTime={
    seconds:"00",
    minutes:"00",
    hours:"00",
    days:"00",
};

export default function Countdown({date}){
    const [timeInMs,setTimeinMs]=useState(date.getTime());
    const [renainingTime,setReminingTime]=useState();
    useEffect(()=>
    {setTimeinMs(date.getTime())},[date]);

    
    useEffect(()=>{
        const interval=setInterval(()=>{
            updateRemainigTime(timeInMs)
        },1000);
        return()=>clearInterval(interval);

    },[timeInMs]);
    
    const updateRemainigTime=(timeInMs)=>{
        setReminingTime(calculateDiff(timeInMs));
    };


    return <div className={styles.countdown}> 
    {
        [...Array(renainingTime?.days.lenght).keys()].map((d,i)=>(
            <span>{renainingTime?.days.slice(i,i+1)}</span>
        ))
    }
  
    <b>:</b>
    <span>{renainingTime?.hours.slice(0,1)}</span>
    <span>{renainingTime?.hours.slice(1,2)}</span>
    <b>:</b>
    <span>{renainingTime?.minutes.slice(0,1)}</span>
    <span>{renainingTime?.minutes.slice(1,2)}</span>
    <b>:</b>
    <span>{renainingTime?.seconds.slice(0,1)}</span>
    <span>{renainingTime?.seconds.slice(1,2)}</span>
    
     </div>
}