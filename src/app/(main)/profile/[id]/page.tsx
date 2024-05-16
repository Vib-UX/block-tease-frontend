'use client';
import { ethers } from 'ethers';
import React, { useState } from 'react';

import { balanceOffModel, getModalPayment } from '@/lib/func';

import ModelBanner from '@/app/(main)/profile/(components)/banner';
import ModelFeed from '@/app/(main)/profile/(components)/feed';
import RightSideBar from '@/app/(main)/profile/(components)/rightSideBar';
import NotFound from '@/app/not-found';
import { IndianModelCardData } from '@/utils/modelData';

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  const [modelFees, setModelFees] = useState<number>(0);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const modelData = IndianModelCardData.filter(
    (item) => item.slug === params.id
  )[0];

  console.log(modelFees)
  const fetchModalFees = async () => {
    const data = await getModalPayment(modelData.id);
    console.log(data)
    setModelFees(parseInt(data));
  };
  const fetchStatus = async (provider: any) => {
    const res = await balanceOffModel(provider, modelData.id.toString());
    setIsUnlocked(res);
  };
  React.useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as any
      );
      fetchStatus(provider);
    }
    fetchModalFees();
  }, []);

  if (!modelData) return <NotFound />;
  return (
    <div className=' text-white   container py-6   grid grid-cols-5'>
      <div className=' mx-auto flex items-center col-span-3 flex-col justify-center  space-y-4 '>
        <ModelBanner likes={0} {...modelData} />
        <ModelFeed
          modelData={{ ...modelData, likes: 0, index: 0 }}
          modelFees={modelFees}
          setIsUnlocked={setIsUnlocked}
          isUnlocked={isUnlocked}
        />
      </div>
      <div className='px-10 col-span-2'>
        <RightSideBar
          name={modelData.name}
          modelFees={modelFees}
          modelId={modelData.id}
          isUnlocked={isUnlocked}
          setIsUnlocked={setIsUnlocked}

        />
      </div>
    </div>
  );
};

export default Page;
