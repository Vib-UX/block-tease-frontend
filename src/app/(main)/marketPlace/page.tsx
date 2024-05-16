'use client';

import React, { useState } from 'react';

import CustomizedTables from '@/components/ui/marketPlaceTable';
import SwiperCoverflow from '@/components/ui/swiper';
import YourCollection from '@/components/ui/yourCollectionComponent';

import { IndianModelCardData } from '@/utils/modelData';

function Page() {
  const [collection, setCollection] = useState('Your Collection');
  const [data, setData] = useState([]);
  React.useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const filteredArrays = Object.keys(window.localStorage)
        .map((key) => {
          return IndianModelCardData.filter(
            (modelId) => modelId.id === parseInt(key)
          );
        })
        .filter((filteredArray) => filteredArray.length > 0); // Filter out arrays with no data

      // Merge the objects within arrays
      const modelsData: any = filteredArrays.reduce(
        (acc, curr) => acc.concat(curr),
        []
      );
      setData(modelsData);
    }
  }, []);
  return (
    <div className=' flex gap-10 flex-col w-full items-center py-6 overflow-x-hidden'>
      <SwiperCoverflow />
      <div className='w-[1100px]'>
        <div className='flex text-white  justify-around px-10 pb-6 '>
          <span
            onClick={() => setCollection('Your Collection')}
            className={`${
              collection === 'Your Collection'
                ? 'text-fuchsia-500'
                : 'text-white'
            } cursor-pointer font-bold text-xl`}
          >
            Your Collection
          </span>
          <span
            onClick={() => setCollection('Buy Nft')}
            className={`${
              collection === 'Buy Nft' ? 'text-fuchsia-500' : 'text-white'
            } cursor-pointer font-bold text-xl`}
          >
            Buy Collection
          </span>
        </div>
        {collection === 'Buy Nft' ? (
          <CustomizedTables />
        ) : (
          <YourCollection data={data} />
        )}
      </div>
    </div>
  );
}

export default Page;
