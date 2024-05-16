'use client';
import { motion } from "framer-motion"
import Image from 'next/image';
import postIcon from 'public/images/postIcon.png';
import React, { useState } from 'react';

import RippleLoader from '@/components/buttons/rippleLoader';
import CountdownTimer from '@/components/ui/timer';

type props = {

  slug: string;
  name: string;
  icon: any;
  image: any;
  value: number;
  views: number;
  likes: number;
  location: string;
  posts: number,
  AboutMe: string



}

const ModelBanner = ({ name, icon, AboutMe, image, views, posts }: props) => {

  const [redeMore, setReadMore] = useState(false)
  return (
    <div className='w-full  '>
      <div className=' flex flex-col justify-end items-end'>
        <div className='relative w-full'>
          <Image
            src={image}
            alt='banner image'
            className='   object-cover h-[200px] rounded-lg  '
          />

          <Image
            className='absolute rounded-lg border-fuchsia-600 border w-28 h-32 top-[70%]    '
            src={icon}
            alt='banner image'
          />
        </div>

        <div className='flex  w-[80%] justify-between items-center  '>
          <div className='flex flex-col items-start justify-center '>
            <span className='font-bold text-lg flex items-center'>{name}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
              </svg>

            </span>
            <span className='font-bold text-lg'>@{name.split(" ")[0]}.Tease</span>
          </div>
          <div className='flex gap-5 text-sm text-[#A39FA5] items-center justify-center'>
            <div>
              <span>Posts</span>
              <span className='flex items-center justify-center gap-1'>
                <Image src={postIcon} className='w-4 h-4' alt='view icon' /> {posts}
              </span>
            </div>
            <div className=' border-l border-r  px-2 '>
              <span>Views</span>
              <span className='flex items-center justify-center gap-1'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                {' '}
                {views}K
              </span>
            </div>
            <div>
              <span>Tease</span>
              <span className='flex items-center justify-center gap-1'>
                <svg className='w-4 h-4' viewBox="0 0 29 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.59901 17.6116C2.25123 18.2415 2.95961 18.8155 3.71604 19.327C3.91455 19.4635 4.17672 19.4797 4.39181 19.3687C4.60689 19.2577 4.73736 19.0388 4.72808 18.8046C4.55306 14.947 4.90017 3.02643 15.5352 0.0234903C15.743 -0.0349206 15.9674 0.0173659 16.1242 0.160692C16.281 0.304018 16.3463 0.51666 16.2956 0.718671C13.5438 11.8994 20.4363 15.3139 23.5687 10.0369C23.6699 9.86162 23.8595 9.75006 24.0682 9.7429C24.2769 9.73575 24.4742 9.83404 24.5883 10.0019C27.3254 14.0605 26.6031 17.6919 25.8687 19.5874C25.7473 19.9107 25.8467 20.2724 26.1183 20.4963C26.3899 20.7203 26.7775 20.7599 27.0922 20.596C27.5548 20.352 27.9806 20.0486 28.358 19.6943C28.4524 19.6078 28.5914 19.5834 28.7116 19.6322C28.8319 19.6809 28.9104 19.7936 28.9115 19.9189V19.927C28.9145 27.4061 22.7392 33.5412 14.9505 33.7972C7.16182 34.0532 0.563646 28.3379 0.0334209 20.8761C-0.0320938 19.9482 -0.00123588 19.0163 0.125539 18.0942C0.167262 17.779 0.39238 17.5142 0.705695 17.4117C1.01901 17.3092 1.3658 17.3869 1.59942 17.612L1.59901 17.6116Z" fill="#C25FFF" />
                </svg>

                10K
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-between mt-1'>
        <p className='text-[#c4b1de] my-6'>Last seen 15 mins ago</p>
        <div className='text-[#CEB9E9]  text-sm flex gap-2  z-10 transition-all duration-500'>
          <RippleLoader />
          Sale ends
          <CountdownTimer duration={7200 * (Math.floor(Math.random() * 10) + 1)} />
        </div>
      </div>
      <div className='bg-gradient-to-br from-[#c25fff] from-[0%] to-[#5C2499] to-[100%] rounded-md p-[0.8px] h-fit w-full  '>
        <div className='text-[#CEB9E9] flex flex-col rounded-md items-start gap-1 bg-gradient-to-br from-[#291D31] form-[0%] via-[#190F1F] via-[74%] to-[#190F1F] to-[99%] py-1 px-2'>
          <p className='font-semibold text-lg  text-white'>About me</p>

          <motion.div

            className='text-base'>

            {redeMore ? <pre
              className="font-sans transition-all   leading-2 text-wrap duration-500 ease-in-out"
            >{AboutMe}   <button className="text-fuchsia-700" onClick={() => setReadMore(!redeMore)}>ReadLess</button></pre> : <div
              className=" transition-all duration-500 ease-in-out"
            >{AboutMe.substring(0, 128)}  <button className="text-fuchsia-700" onClick={() => setReadMore(!redeMore)}>ReadMore...</button></div>}


          </motion.div>
        </div>
      </div>
    </div >
  );
};

export default ModelBanner;
