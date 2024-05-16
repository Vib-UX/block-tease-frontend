'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import CloudIcon from 'public/images/cloudIcon.png';
import FarcasterIcon from 'public/images/indiaGateIcon.png';
import InstagramIcom from 'public/images/instagramIcon.png';
import TickIcon from 'public/images/tickIcon.png';
import XIcon from 'public/images/xIcon.png';
import React, { useState } from 'react';

import MyModal from '@/components/ui/dialog';

const RightSideBar = ({
  name,
  modelFees,
  modelId,
  isUnlocked,
  setIsUnlocked,
}: {
  name: string;
  modelFees: number;
  modelId: number;
  isUnlocked: boolean;
  setIsUnlocked: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [hover, setHover] = useState(false);
  if (!name) return null;

  return (
    <div className=' flex flex-col items-start gap-4 w-full  '>
      {!isUnlocked && (
        <div className='bg-gradient-to-br from-[#9A3CFF] from-[0%] to-[#5C2499] to-[100%] rounded-md p-[0.8px] h-fit w-full  '>
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
      {/* social icon component  */}
      <div className='bg-gradient-to-br from-[#9A3CFF] from-[0%] to-[#5C2499] to-[100%] rounded-md p-[0.8px] h-fit w-full    '>
        <div className=' flex flex-col  rounded-md items-center gap-4 p-2 bg-gradient-to-br from-[#291D31] form-[100%] via-[#190F1F] via-[50%] to-[#190F1F] to-[100%]'>
          <p>Socials</p>
          <div className=' flex items-center justify-around w-full p-4'>
            <div
              className='group relative'
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <Image
                src={CloudIcon}
                className='w-12 h-10 rounded-sm  duration-75 group-hover:fill-black fill-slate-800 group-hover:scale-110 transition-all ease-in-out '
                alt='indiaGateIcon'
              />
              {hover && (
                <motion.div
                  className=' absolute  px-2 bg-gradient-to-br rounded-md from-[#020202] form-[100%] via-[#1f0b29] via-[50%] to-[#110418] to-[100%]  top-0 -translate-y-1/2 left-0 -translate-x-1/2  text-[8px]  text-center group-hover:block hidden '
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ y: 40, opacity: 1 }}
                  exit={{ y: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'linear' }}
                >
                  {name.split(' ')[0]}.xyz
                </motion.div>
              )}
            </div>
            <div
              className='group relative'
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <Image
                src={FarcasterIcon}
                className='w-9 h-8 rounded-sm  duration-75 group-hover:fill-black fill-slate-800 group-hover:scale-110 transition-all ease-in-out '
                alt='indiaGateIcon'
              />
              {hover && (
                <motion.div
                  className=' absolute  px-2 bg-gradient-to-br rounded-md from-[#020202] form-[100%] via-[#1f0b29] via-[50%] to-[#110418] to-[100%]  top-0 -translate-y-1/2 -left-2 -translate-x-1/2  text-[8px]  text-center group-hover:block hidden  '
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ y: 40, opacity: 1 }}
                  exit={{ y: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'linear' }}
                >
                  {name.split(' ')[0]}.far
                </motion.div>
              )}
            </div>
            <div
              className='group relative'
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <Image
                src={InstagramIcom}
                className='w-9 h-8 rounded-sm  duration-75 group-hover:fill-black fill-slate-800 group-hover:scale-110 transition-all ease-in-out '
                alt='indiaGateIcon'
              />

              {hover && (
                <motion.div
                  className=' absolute  px-2 bg-gradient-to-br rounded-md from-[#020202] form-[100%] via-[#1f0b29] via-[50%] to-[#110418] to-[100%]  top-0 -translate-y-1/2  -left-2 -translate-x-1/2  text-[9px]  text-center group-hover:block hidden  '
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ y: 40, opacity: 1 }}
                  exit={{ y: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'linear' }}
                >
                  {name.split(' ')[0]}.in
                </motion.div>
              )}
            </div>
            <div
              className='group relative'
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <Image
                src={XIcon}
                className='w-9 h-8 rounded-sm  duration-75 group-hover:fill-black fill-slate-800 group-hover:scale-110 transition-all ease-in-out '
                alt='indiaGateIcon'
              />

              {hover && (
                <motion.div
                  className=' absolute  px-2 bg-gradient-to-br rounded-md from-[#020202] form-[100%] via-[#1f0b29] via-[50%] to-[#110418] to-[100%]  top-0 -translate-y-1/2 -left-2 -translate-x-1/2  text-[9px]  text-center group-hover:block hidden '
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ y: 40, opacity: 1 }}
                  exit={{ y: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'linear' }}
                >
                  {name.split(' ')[0]}.X
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {!isUnlocked && (
        <div className='bg-gradient-to-br from-[#9A3CFF] from-[0%] to-[#5C2499] to-[100%] rounded-md p-[0.8px] h-fit w-full    '>
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
