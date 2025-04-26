import React, { useEffect, useState } from "react";

const rotatingWords = [
  // "Sustainable",
  "Smart",
  "Bold",
  "Green",
  "Digital",
  // "Innovative",
  "Inclusive",
  // "Connected",
  "Ethical",
  "Resilient"
];

export default function Heading() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % rotatingWords.length);
        setFade(true);
      }, 500); // Half of the transition time
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="heading  text-4xl  md:text-3xl lg:text-5xl font-bold text-center leading-tight md:leading-snug">
        Building a{" "}
        <span 
          className={`heading inline-block transition-all duration-500 bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
          style={{ minWidth: '180px' }} // Prevents layout shift
        >
          {rotatingWords[index]}
        </span>{" "}
        <span className=" heading whitespace-nowrap">Future Together</span>
      </div>
    </div>
  );
}