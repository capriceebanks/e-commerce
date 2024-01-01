'use client'

import React, { useEffect, useState, useRef } from 'react'

import classes from './index.module.scss'

const Promotion = () => {

  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date(); 
    targetDate.setDate(targetDate.getDate() + 3);

    const updateTimer = () => {
      const currentDate = new Date();
      const timeDifference = targetDate.getTime() - currentDate.getTime();

      if (timeDifference <= 0) {
        // Target date has been reached, stop the timer
        clearInterval(intervalId);
        return;
      }

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      setTime({
        days,
        hours,
        minutes,
        seconds,
      });
    };

    // Update the timer every second (1000 milliseconds)
    const intervalId = setInterval(updateTimer, 1000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run the effect only once on mount

  // Your component JSX here, you can render the `time` state as needed

 
  return (
    <section className={classes.promotion}>
      <div className={classes.textBox}>
        <h3 className={classes.title}>
          Deals of the Month
        </h3>
        <p>
          Get ready for a shopping experience like never before with our Deals of the Month! Every purchase comes with exclusive perks and offers, making this month a celebration of savvy choices and amazing deals. Don't miss out!
        </p>
        <ul className={classes.stats}>
          <StatBox label="Days" value={time.days} />
          <StatBox label="Hours" value={time.hours} />
          <StatBox label="Minutes" value={time.minutes} />
          <StatBox label="Seconds" value={time.seconds} />

        </ul>
      </div>
    </section>
  )
}

const StatBox = ({ label, value }: {label: string, value: number}) => (
  <li className={classes.statBox}>
    <h4>{value}</h4>
    <p> {label} </p>
  </li>
)

export default Promotion
