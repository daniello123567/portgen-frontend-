import React, { useEffect, useState } from 'react';
import {AnimatePresence, motion} from 'framer-motion'

const ParagraphCycler = () => {
  const paragraphs = [
    "[1/1] Building Project...",
    "[1/2] Installing Dependecies...",
    "[1/3] Running Eslint...",
    "[1/4] Collecting Page data...",
    "[1/5] Compiled Sucessfully.",
    "[1/6] Assigning Deployment Url...",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let interval;

    if (currentIndex < 5) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1));
      }, 6000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [currentIndex]); 

  return (
    <div className="text-center">
      <AnimatePresence>
        <motion.p
          key={currentIndex}
          initial={{y:20,opacity:0}}
          transition={{duration:0.4,ease:'easeInOut'}}
          animate={{y:0,opacity:1}}
          exit={{y:-20,opacity:0}}
          className="transition-opacity text-[#5e5c5c] duration-500 ease-in-out opacity-100"
        >
          {currentIndex !== 5 ? paragraphs[currentIndex] : "Assigning Project URL..."}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default ParagraphCycler;
