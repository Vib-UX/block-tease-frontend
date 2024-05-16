'use client';
import React from 'react';

import MarketPlaceCard from '@/components/ui/marketPlaceCard';

const YourCollection = ({ data}: { data: any; }) => {
  return (
    <div className=' w-full  text-white '>
      {data.length === 0 ? (
        <div className='flex items-center justify-center w-full h-[500px]'>
          <p className='text-white text-3xl font-bold'>
            "You don't have any collection yet.
            <br /> Buy some NFTs to get started."
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12 p-10'>
          {data.map((item: any, index: number) => (
            <React.Fragment key={index}>
              <MarketPlaceCard {...item} index={index + 1} />
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default YourCollection;
