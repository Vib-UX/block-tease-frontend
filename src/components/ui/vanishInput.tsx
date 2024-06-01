'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Typewriter from 'typewriter-effect';
export function VanishInput({
  placeholders,
  progress,
}: {
  placeholders: string[];
  progress: number;
}) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);

  // useEffect(() => {
  //   const startAnimation = () => {
  //     const interval = setInterval(() => {
  //       // if (progress === 66) {
  //       //   setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
  //       // }
  //       // if (progress >= 10 && progress <= 30) {
  //       //   setCurrentPlaceholder(0);
  //       //   setCurrentPlaceholder(1);
  //       // } else if (progress >= 33 && progress < 66) {
  //       //   setCurrentPlaceholder(2);
  //       // } else if (progress >= 66) {
  //       //   setCurrentPlaceholder(3);
  //       // } else {
  //       //   setCurrentPlaceholder(4);
  //       // }
  //       setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
  //     }, 3500);
  //     return () => clearInterval(interval);
  //   };

  //   startAnimation();
  // }, [placeholders.length, progress]);
  useEffect(() => {
    const startAnimation = () => {
      const interval = setInterval(() => {
        setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
      }, 3500);
      return () => clearInterval(interval);
    };

    startAnimation();
  }, [placeholders.length]);

  return (
    <div className='absolute inset-0 flex items-center rounded-full pointer-events-none'>
      <AnimatePresence mode='wait'>
        {
          <motion.p
            initial={{
              y: 5,
              opacity: 0,
            }}
            key={`current-placeholder-${currentPlaceholder}`}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -15,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
              ease: 'linear',
            }}
            className='text-sm sm:text-base  text-[#ceb9e9] font-semibold pl-4 sm:pl-12 text-left w-[calc(100%-2rem)] truncate'
          >
            <Typewriter
              options={{
                delay: 15,
                cursor: '',
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString(placeholders[currentPlaceholder])
                  .pauseFor(2000)
                  .start();
              }}
            />
          </motion.p>
        }
      </AnimatePresence>
    </div>
  );
}
