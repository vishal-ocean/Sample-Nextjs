import React, { useEffect, useState } from "react";

interface CountdownTimerProps {
  futureDateTime: Date;
  resendCode: () => void;
}

const calculateRemainingTime = (futureDateTime: Date): string => {
  const currentTime = new Date();
  const timeDifference = futureDateTime.getTime() - currentTime.getTime();

  if (timeDifference <= 0) {
    return "Countdown expired";
  }

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  const remainingTime = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  return remainingTime;
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  futureDateTime,
  resendCode,
}) => {
  const [remainingTime, setRemainingTime] = useState(
    calculateRemainingTime(futureDateTime)
  );
  const [countdownEnded, setCountdownEnded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const newRemainingTime = calculateRemainingTime(futureDateTime);
      setRemainingTime(newRemainingTime);

      if (newRemainingTime === "Countdown expired") {
        setCountdownEnded(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [futureDateTime]);

  return (
    <div>
      <p>{countdownEnded ? "Time expired" : `Expires in : ${remainingTime}`}</p>
      {countdownEnded && (
        <button
          onClick={resendCode}
          className="bg-blue-500 text-white px-4 py-2 rounded-md text-center"
        >
          Resend Code
        </button>
      )}
    </div>
  );
};

export default CountdownTimer;
