import React, { FC } from 'react';
import { useStopwatch } from 'react-timer-hook';

const Stopwatch: FC<any> = () => {
  const { seconds, minutes, hours, start, pause, reset } = useStopwatch({
    autoStart: false,
  });

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '100px' }}>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      {/* <button onClick={reset}>Reset</button> */}
    </div>
  );
};

export default Stopwatch;
