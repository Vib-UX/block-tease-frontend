'use client';
import Image from 'next/image';
import TickIcon from 'public/images/tickIcon.png';
import React from 'react';

import RippleLoader from '@/components/buttons/rippleLoader';
import MyModal from '@/components/ui/dialog';
import ExclusiveCard from '@/components/ui/exclusiveCard';
import CountdownTimer from '@/components/ui/timer';

const RightSideBar = ({
  name,
  modelFees,
  modelId,
  isUnlocked,
  setIsUnlocked,
  image,
}: {
  name: string;
  modelFees: number;
  modelId: number;
  isUnlocked: boolean;
  setIsUnlocked: React.Dispatch<React.SetStateAction<boolean>>;
  image: any
}) => {
  if (!name) return null;

  return (
    <div className=' flex flex-col items-start gap-4 w-full  '>
      {!isUnlocked && (
        <div className='bg-gradient-to-br from-[#9A3CFF] from-[0%] to-[#5C2499] to-[100%] rounded-md p-[0.8px] h-fit w-full  '>
          <div className=' flex flex-col rounded-md items-center gap-4 p-10 bg-gradient-to-br from-[#291D31] form-[100%] via-[#190F1F] via-[50%] to-[#190F1F] to-[100%]'>
            <h2 className='text-lg text-[#BF1396]'>
              Subscribe and get these benefits
            </h2>
            <div className='flex  text-start flex-col gap-2  w-full text-[#CEB9E9]'>
              <p className='flex gap-4 items-center'>
                <Image src={TickIcon} alt='tickIcon' /> Unlock complete access{' '}
                <br /> to this user's exclusive content{' '}
              </p>
              <p className='flex gap-4 items-center'>
                <Image src={TickIcon} alt='tickIcon' /> Dive into Dm’s
              </p>
              <p className='flex gap-4 items-center'>
                <Image src={TickIcon} alt='tickIcon' /> You have the freedom to
                cancel <br /> your subscription anytime{' '}
              </p>
            </div>
            <MyModal
              dialogFor='Subscribe Now for '
              value={modelFees}
              modelId={modelId}
              setIsUnlocked={setIsUnlocked}
              name={name.split(' ')[0]}
            />
          </div>
        </div>
      )}

      <div className='bg-gradient-to-br from-[#9A3CFF] from-[0%] to-[#5C2499] to-[100%] rounded-md p-[0.8px] h-fit w-full    '>
        <div className=' flex flex-col  rounded-md items-center gap-4 p-2 bg-gradient-to-br from-[#291D31] form-[100%] via-[#190F1F] via-[50%] to-[#190F1F] to-[100%]'>
          <div className='text-[#CEB9E9]  text-sm flex gap-2  z-10'>

            <RippleLoader />
            Sale ends
            <CountdownTimer duration={7200 * (Math.floor(Math.random() * 10) + 1)} />
          </div>
          <ExclusiveCard name={name.split(" ")[0]} image={image} />


        </div>
      </div>

      {!isUnlocked && (
        <div className='hidden md:block bg-gradient-to-br from-[#9A3CFF] from-[0%] to-[#5C2499] to-[100%] rounded-md p-[0.8px] h-fit w-full    '>
          <div className=' flex flex-col rounded-md items-center gap-4 p-10 bg-gradient-to-br from-[#291D31] form-[100%] via-[#190F1F] via-[50%] to-[#190F1F] to-[100%]'>
            <h2 className='text-xl text-[#BF1396]'>
              Subscribe and get these benefits
            </h2>
            <div className='flex  text-start flex-col gap-2  w-full text-[#CEB9E9]'>
              <p className='flex gap-4 items-center'>
                <Image src={TickIcon} alt='tickIcon' /> Unlock complete access{' '}
                <br /> to this user's exclusive content{' '}
              </p>
              <p className='flex gap-4 items-center'>
                <Image src={TickIcon} alt='tickIcon' /> Dive into Dm’s
              </p>
              <p className='flex gap-4 items-center'>
                <Image src={TickIcon} alt='tickIcon' /> You have the freedom to
                cancel <br /> your subscription anytime{' '}
              </p>
            </div>
            <MyModal
              dialogFor='Subscribe For'
              value={modelFees}
              modelId={modelId}
              setIsUnlocked={setIsUnlocked}
              name={name.split(' ')[0]}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RightSideBar;
