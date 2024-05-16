import Image from 'next/image';
import Link from 'next/link';
import amFlag from 'public/images/americaFlagIcon.png';
import React from 'react';

import CreatorsIcon from '@/../public/images/creatorsIcon.png';
import FavoritesIcon from '@/../public/images/FavoritesIcon.png';
import HomeIcon from '@/../public/images/homeIcon.png';
import LiveIcon from '@/../public/images/liveIcon.png';
import marketPlaceIcon from '@/../public/images/marketPlaceIcon.png';
import SettingIcon from '@/../public/images/settingsIcon.png';
import stakingIcon from '@/../public/images/stakingIcon.png';
const sideBarContentGenral = [
  {
    tag: 'Home',
    icon: HomeIcon,
    link: '/feed',
  },

  {
    tag: 'Creators',
    icon: CreatorsIcon,
    link: '#',
  },
  {
    tag: 'Favorites',
    icon: FavoritesIcon,
    link: '#',
  },
  {
    tag: 'Live',
    icon: LiveIcon,
    link: '#',
  },

  {
    tag: 'Settings',
    icon: SettingIcon,
    link: '#',
  },
];

const sideBarcontentSpecials = [
  {
    tag: 'Staking',
    icon: stakingIcon,
    link: '#',
    iconAfter: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='w-5 h-5'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z'
        />
      </svg>
    ),
  },

  {
    tag: 'Marketplace',
    icon: marketPlaceIcon,
    link: '/marketPlace',
  },
];

const SideBar = () => {
  return (
    <div className=' text-white h-full flex flex-col items-center w-[25%]   sticky -top-[40%] left-0 m-6'>
      <div className='bg-gradient-to-br  from-[#9A3CFF] from-[0%] to-[#5C2499] to-[100%] rounded-md p-[0.8px]'>
        <div className='bg-gradient-to-br rounded-md py-5 from-[#291D31] form-[100%] via-[#190F1F] via-[50%] to-[#190F1F] to-[100%] flex flex-col justify-between  items-center  gap-4'>
          <SideBarSections
            sectionFor='general'
            content={sideBarContentGenral}
          />
          <SideBarSections
            sectionFor='specials'
            content={sideBarcontentSpecials}
          />

          <div className='m-4 p-[0.8px] rounded-xl max-w-sm bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 relative '>
            <input
              placeholder='Search here'
              className=' text-[#CEB9E9] w-full  h-10 bg-[#2B213B] outline-none focus:outline-none rounded-xl  px-12  '
            />
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 absolute text-[#CEB9E9] top-0 translate-x-full translate-y-1/3 '
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
              />
            </svg>
          </div>
          {/* text-[#A188C1] */}
          <ul className='text-lg capitalize gap-2 flex flex-col items-start justify-start '>
            <li className='flex  items-center gap-1 justify-start'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-4 '
                viewBox='0 0 512 512'
                id='india'
              >
                <path fill='#f0f0f0' d='M0 85.337h512v341.326H0z'></path>
                <path fill='#ff9811' d='M0 85.337h512v113.775H0z'></path>
                <path fill='#6da544' d='M0 312.888h512v113.775H0z'></path>
                <circle cx='256' cy='256' r='43.896' fill='#0052b4'></circle>
                <circle cx='256' cy='256' r='27.434' fill='#f0f0f0'></circle>
                <path
                  fill='#0052b4'
                  d='m256 222.146 8.464 19.195 20.855-2.268L272.927 256l12.392 16.927-20.855-2.268L256 289.854l-8.464-19.195-20.855 2.268L239.073 256l-12.392-16.927 20.855 2.268z'
                ></path>
              </svg>
              Indian
            </li>
            <li className=' gap-2 items-center  justify-start'>
              ⚡New creators
            </li>
            <li className=''>🫦 Flirting</li>
            <li className=''>💃 Dance</li>
            <li>🗾 Asian</li>
            <li className=' flex gap-1 justify-center items-center'>
              {' '}
              <Image src={amFlag} alt='amflag' className='w-5' />
              American
            </li>
            <li>🌍 Global </li>
            <li>🌇 Outdoor</li>
            <li>😈 ASMR</li>
            <li>👀 VR cams</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

export const SideBarSections = ({
  sectionFor,
  content,
}: {
  sectionFor: any;
  content: any;
}) => {
  return (
    <div
      className={`${
        sectionFor === 'specials'
          ? ' border-[#CEB9E9] border-y-[0.5px] py-6 px-4 w-[80%]'
          : ''
      }  flex flex-col  gap-4 items-center justify-around  `}
    >
      <p className='capitalize  bg-gradient-to-br text-2xl font-bold  from-[#FB0393] from-[0%] to-[#9A3CFF] to-[100%] bg-clip-text text-transparent text-center'>
        {sectionFor}
      </p>
      <div className='flex gap-4 flex-col items-start justify-center'>
        {content.map((item: any, index: number) => (
          <Link
            href={item.link}
            key={index}
            className='flex gap-4 items-center '
          >
            <Image
              src={item.icon}
              priority
              alt={item.tag}
              width={20}
              height={20}
            />
            <p className='hidden lg:block text-lg  '>{item.tag}</p>
            {item.iconAfter ? item.iconAfter : ''}
          </Link>
        ))}
      </div>
    </div>
  );
};
