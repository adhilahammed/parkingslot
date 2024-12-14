import React, { useEffect, useState } from "react";

const Time = ({ createdTime }) => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [amount, setAmount] = useState(0);
  const [previousMinutes, setPreviousMinutes] = useState(0);

  useEffect(() => {
    const createdTimestamp = new Date(createdTime).getTime();
    const interval = setInterval(() => {
      const currentTimestamp = Date.now();
      const elapsed = Math.floor((currentTimestamp - createdTimestamp) / 1000); // in seconds
      setTimeElapsed(elapsed);

      const currentMinutes = Math.floor(elapsed / 60);
      if (currentMinutes > previousMinutes) {
        // Add charge for newly completed minutes
        setAmount(
          (prevAmount) => prevAmount + (currentMinutes - previousMinutes) * 2
        );
        setPreviousMinutes(currentMinutes);
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [createdTime, previousMinutes]);

  // Format the time in HH:MM:SS
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <h1>Time Elapsed:</h1>
      <p>{formatTime(timeElapsed)}</p>
      <h2>Amount Due:</h2>
      <p>₹ {amount}</p>
    </div>
  );
};

export default Time;
