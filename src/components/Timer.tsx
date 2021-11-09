import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getStartTime } from '../state/selectors';
import TimeDisplay from './TimeDisplay';

const Timer = () => {
  const startTime = useSelector(getStartTime);
  const [currentTime, setCurrentTime] = useState(new Date().getTime());
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);
  const thick = () => {
    if (interval.current) {
      setCurrentTime(new Date().getTime());
    }
  };
  useEffect(
    () => {
      interval.current = setInterval(thick, 100);
      return () => {
        if (interval.current) {
          clearInterval(interval.current);
        }
      }
    }, []
  )
  return <TimeDisplay timeInMillis={currentTime - (startTime || 0)} />;
}

export default Timer;
