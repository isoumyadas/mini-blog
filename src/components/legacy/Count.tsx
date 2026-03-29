import { useState, useEffect } from "react";


const Count = () => {
 const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    // 👇 Cleanup: stop the timer when component unmounts
    return () => {
      clearInterval(interval);
    };
  }, []); // Only set up once

  return <h1>Count: {count}</h1>
  
}

export default Count


/**
 * 
 * When the component is removed from the screen, the interval would keep running in memory
 * 
 * Cleanup function runs before the component unmounts or before the effect re-runs
 * 
 * Always clean up: intervals, timeouts, event listeners, subscriptions
 * 
 * 
 */