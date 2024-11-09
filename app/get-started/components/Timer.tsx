"use client"
import React, { useState, useEffect } from 'react';

const CountdownTimer = ({url}:{url:string|undefined}) => {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
       if(url)return;
        const timer = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds + 1);

        }, 1000);
      if(url){
        clearInterval(timer)
      }
        return () => clearInterval(timer);
    }, [seconds,url]);

    const formatTime = (timeInSeconds:number) => {
        const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
        const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    return (
            <span>{formatTime(seconds)}</span>
    );
};

export default CountdownTimer;
