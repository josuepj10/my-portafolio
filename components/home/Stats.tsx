"use client";

import CountUp from "react-countup";
import { text } from "stream/consumers";
import clsx from "clsx";

const stats = [
  {
    num: 5,
    text: "Years of experience",
  },
  {
    num: 8,
    text: "Projects",
  },
  {
    num: 12,
    text: "Technologies",
  },
  {
    num: 500,
    text: "Code commits",
  },
];

export const Stats = () => {
  return (
    <section className="flex justify-center items-center">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center">
            <span className="text-4xl  font-extrabold">
              <CountUp end={stat.num} duration={5} delay={2} />
            </span>
            <span className="mt-2 font-secondary">{stat.text}</span>
          </div>
        ))}
      </div>
    </section>
  );  

};
