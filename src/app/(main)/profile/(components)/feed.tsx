'use client';

import React from 'react';

import FeedCard from '@/app/(main)/profile/(components)/feddCard';

type props = {
  modelData: {
    id: number;
    slug: string;
    name: string;
    icon: any;
    image: any;
    value: number;
    views: number;
    likes: number;
    location: string;
    index: number;
    posts: number;
  };
  modelFees: number;
  setIsUnlocked: React.Dispatch<React.SetStateAction<boolean>>;
  isUnlocked: boolean;
};

const ModelFeed = ({
  modelData,
  modelFees,
  setIsUnlocked,
  isUnlocked,
}: props) => {
  return (
    <div className='w-full '>
      <div className='bg-gradient-to-br from-[#9A3CFF] from-[0%] to-[#5C2499] to-[100%] rounded-md p-[0.8px] h-fit w-full  '>
        <div className=' flex flex-col items-center rounded-md  gap-1 bg-gradient-to-br from-[#291D31] form-[100%] via-[#190F1F] via-[74%] to-[#190F1F] to-[99%] '>
          <section className=' w-full    flex   bg- justify-around h-12 items-center   '>
            <div className='border-b-4  border-[#fb0393] p-1 rounded-md transition-all ease-in-out duration-100 cursor-pointer'>
              Posts
            </div>
            <div className=' p-1 rounded-md transition-all ease-in-out duration-100 cursor-pointer'>
              Media
            </div>
          </section>
          <div className=' flex justify-between w-full px-10 text-lg text-[#CEB9E9] '>
            <span>Latest post</span>
            <span>4 hrs ago</span>
          </div>
          <FeedCard
            {...modelData}
            modelFees={modelFees}
            setIsUnlocked={setIsUnlocked}
            isUnlocked={isUnlocked}
          />
          <FeedCard
            {...modelData}
            modelFees={modelFees}
            setIsUnlocked={setIsUnlocked}
            isUnlocked={isUnlocked}
          />
          <FeedCard
            {...modelData}
            modelFees={modelFees}
            setIsUnlocked={setIsUnlocked}
            isUnlocked={isUnlocked}
          />
          <FeedCard
            {...modelData}
            modelFees={modelFees}
            setIsUnlocked={setIsUnlocked}
            isUnlocked={isUnlocked}
          />
        </div>
      </div>
    </div>
  );
};

export default ModelFeed;
