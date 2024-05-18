'use client';

import {
  useDisconnect,
  useWeb3Modal,
  useWeb3ModalAccount,
} from '@web3modal/ethers5/react';
import useWeb3Auth from 'hooks/useWeb3Auth';
import Image from 'next/image';
import Link from 'next/link';
import { ImSpinner2 } from 'react-icons/im';

import { cn } from '@/lib/utils';

import logo from '../../../public/images/logoWithoutGradient.png';
const getButtonCTA = ({
  isLoading,
  text,
}: {
  isLoading: boolean;
  text: string;
}) => {
  if (isLoading) {
    return (
      <span
        className={cn(
          'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
        )}
      >
        <ImSpinner2 className='animate-spin' />
      </span>
    );
  }
  return text;
};

const Header = () => {
  const { open } = useWeb3Modal();
  const { address } = useWeb3ModalAccount();
  const { disconnect } = useDisconnect();

  const { login } = useWeb3Auth()

  return (
    <div className='w-full flex items-center justify-around bg-[#130D1A] p-6 sticky top-0 z-50 '>
      <div className='w-[25%] flex flex-col text-center    '>
        <Link href='/'>
          <Image src={logo} priority alt='logo' width={200} height={100} />
          <span className=' text-[#CEB9E9]'>
            only<span className='text-blue-500'>Fans</span> for Web3
          </span>
        </Link>
      </div>
      <div className='w-[50%]'>
        <div className='m-4 p-[0.8px] rounded-xl w-[80%] bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 relative '>
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
      </div>
      <div className='flex items-center justify-end w-[25%] ml-10'>
        <button
          onClick={() => login()}
          className='z-30 relative bg- w-[150px] h-[40px] bg-gradient-to-b from-[#FB0393] from-[0%] to-[#9A3CFF] to-[100%] font-bold rounded-md text-white  py-2'
        >
          {getButtonCTA({
            isLoading: false || false,
            text: address
              ? address.slice(0, 4) + '...' + address.slice(4, 7)
              : 'Connect wallet',
          })}
        </button>
      </div>
    </div>
  );
};

export default Header;
