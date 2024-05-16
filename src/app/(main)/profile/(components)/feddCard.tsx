import Image from 'next/image';
import modelfeedImage from 'public/images/modelFeedImage.png';
import modelFeedUnlockedImage from 'public/images/modelFeedUnlockedImage.png';
import React, { useState } from 'react';

import MyModal from '@/components/ui/dialog';
type props = {
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
  modelFees: number;
  id: number;
  setIsUnlocked: React.Dispatch<React.SetStateAction<boolean>>;
  isUnlocked: boolean;
};
const FeedCard = ({
  name,
  icon,
  slug,
  image,
  likes,
  views,
  posts,
  id,
  modelFees,
  setIsUnlocked,
  isUnlocked,
}: props) => {
  console.log(modelFees);
  const [locked, setLocked] = useState(true);
  const [liked, setLiked] = useState(false);
  return (
    <div className='w-full flex gap-2 flex-col justify-center border-[#CEB9E9] border-b  text-[#CEB9E9]   p-6'>
      <div className='flex justify-between w-full '>
        <div className='flex items-center gap-3'>
          <Image
            src={icon}
            alt='modelProfilePic'
            className='w-10 h-10 rounded-full'
          />
          <div className=' text-sm'>
            <p>{name}</p>
            <p>@{slug}</p>
          </div>
        </div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z'
          />
        </svg>
      </div>
      <p>I know what you're really looking for 💋</p>
      <div className='relative '>
        {isUnlocked ? (
          <Image
            src={modelFeedUnlockedImage}
            alt='feedImage'
            className=' w-full object-cover rounded-md '
          />
        ) : (
          <div>
            <Image
              src={modelfeedImage}
              alt='feedImage'
              className=' w-full object-cover rounded-md '
            />

            {locked ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-14 h-14 rounded-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-100 ease-in-out'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-14 h-14 rounded-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-100 ease-in-out'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z'
                />
              </svg>
            )}
          </div>
        )}
      </div>
      {!isUnlocked && (
        <MyModal
          dialogFor='Subscribe For'
          setLocked={setLocked}
          value={modelFees}
          name={name.split(' ')[0]}
          modelId={id}
          setIsUnlocked={setIsUnlocked}
        />
      )}
      <div className='flex gap-4 items-center justify-start'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z'
          />
        </svg>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
          />
        </svg>
        <svg
          className='w-4 h-4 cursor-pointer active:scale-125'
          onClick={() => setLiked(!liked)}
          viewBox='0 0 29 34'
          fill='none'
          strokeWidth={2}
          stroke={liked ? '#C25FFF' : 'currentColor'}
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M1.59901 17.6116C2.25123 18.2415 2.95961 18.8155 3.71604 19.327C3.91455 19.4635 4.17672 19.4797 4.39181 19.3687C4.60689 19.2577 4.73736 19.0388 4.72808 18.8046C4.55306 14.947 4.90017 3.02643 15.5352 0.0234903C15.743 -0.0349206 15.9674 0.0173659 16.1242 0.160692C16.281 0.304018 16.3463 0.51666 16.2956 0.718671C13.5438 11.8994 20.4363 15.3139 23.5687 10.0369C23.6699 9.86162 23.8595 9.75006 24.0682 9.7429C24.2769 9.73575 24.4742 9.83404 24.5883 10.0019C27.3254 14.0605 26.6031 17.6919 25.8687 19.5874C25.7473 19.9107 25.8467 20.2724 26.1183 20.4963C26.3899 20.7203 26.7775 20.7599 27.0922 20.596C27.5548 20.352 27.9806 20.0486 28.358 19.6943C28.4524 19.6078 28.5914 19.5834 28.7116 19.6322C28.8319 19.6809 28.9104 19.7936 28.9115 19.9189V19.927C28.9145 27.4061 22.7392 33.5412 14.9505 33.7972C7.16182 34.0532 0.563646 28.3379 0.0334209 20.8761C-0.0320938 19.9482 -0.00123588 19.0163 0.125539 18.0942C0.167262 17.779 0.39238 17.5142 0.705695 17.4117C1.01901 17.3092 1.3658 17.3869 1.59942 17.612L1.59901 17.6116Z'
            fill={liked ? '#C25FFF' : ''}
          />
        </svg>
      </div>
    </div>
  );
};

export default FeedCard;
