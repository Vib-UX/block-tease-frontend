import React, { useEffect, useState } from 'react';

const CountdownTimer = ({ duration = 9 * 3600 }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft === 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [duration]);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}h ${minutes
      .toString()
      .padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
  };

  return <p className='text-white'> {formatTime(timeLeft)}</p>;
};

export default CountdownTimer;
