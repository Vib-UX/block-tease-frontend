"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

let interval: any;

type Card = {
  id: number;
  collection: string;
  image: any;
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 30;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    startFlipping();

    return () => clearInterval(interval);
  }, []);
  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards]; // create a copy of the array
        newArray.unshift(newArray.pop()!); // move the last element to the front
        return newArray;
      });
    }, 3000);
  };

  return (
    <div className="relative w-[300px]  top-[20%] left-[12%]  ">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute top-1/2 left-1/2  px-4 rounded-md  overflow-hidden flex flex-col justify-between"
            style={{
              transformOrigin: "top center",

            }}
            animate={{
              top: index * -CARD_OFFSET,
              left: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
              zIndex: cards.length - index, //  decrease z-index for the cards that are behind
            }}
          >

            <div className="relative   font-normal rounded-md  text-neutral-200">
              <div className='bg-gradient-to-br from-[#FB0393] from-[0%] to-[#950257] to-[100%] rounded-md p-[0.8px] h-fit w-full  '>
                <Image src={card.image} alt="" className="  w-[450px] h-[180px] rounded-md   object-cover " />
              </div>
              <div className=" bg-black w-full h-12 blur-sm bg-opacity-[60%] rounded-b-lg  absolute top-[80%] left-0   font-medium ">
                .
              </div>

              <p className="blur-0 z-50 absolute top-[85%] px-2  text-[#CEB9E9]   " >{card.collection}</p>
            </div>

          </motion.div>
        );
      })}
    </div>
  );
};
