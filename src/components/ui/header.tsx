'use client';

import { useSession } from "next-auth/react";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

import useFetchUserDetails from "@/hooks/useFetchUserDetails";

import AccountConnect from '@/components/layout/header/AccountConnect';
import GoogleSignIn from "@/components/layout/header/GoogleSiginModal";
import Avatar from "@/components/ui/avatar";

import logo from '../../../public/images/logoWithoutGradient.png';

type props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ isOpen, setIsOpen }: props) => {
  const { data: session, status } = useSession()

  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const { address } = useAccount()

  const { data: userData, isLoading } = useFetchUserDetails()

  useEffect(() => {
    if (address) {
      if (status === "unauthenticated" || userData?.isFound === false) {
        setIsSignInOpen(true)
      }
    }
  }, [address, status, userData?.isFound]);


  return (
    <div className='w-full flex items-center justify-between bg-[#130D1A] px-6 py-4 lg:py-6 fixed top-0 z-50'>
      <GoogleSignIn isOpen={isSignInOpen} setIsOpen={setIsSignInOpen} />
      <div className='text-white lg:hidden'>
        {!isOpen ? (
          <svg
            onClick={() => setIsOpen(true)}
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-10 transition-all ease-in-out delay-200'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
            />
          </svg>
        ) : (
          <svg
            onClick={() => setIsOpen(false)}
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-10 transition-all ease-in-out delay-200'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18 18 6M6 6l12 12'
            />
          </svg>
        )}
      </div>
      <div className='w-1/4 flex flex-col text-center'>
        <Link href='/'>
          <Image src={logo} priority alt='logo' width={200} height={100} />
          <span className='text-[#CEB9E9] hidden sm:inline-block'>
            only<span className='text-blue-500'>Fans</span> for Web3
          </span>
        </Link>
      </div>
      <div className='hidden md:block w-1/2'>
        <div className='m-4 p-[0.8px] rounded-xl w-[80%] bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 relative'>
          <input
            placeholder='Search here'
            className='text-[#CEB9E9] w-full h-10 bg-[#2B213B] outline-none focus:outline-none rounded-xl px-12'
          />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6 absolute text-[#CEB9E9] top-0 translate-x-full translate-y-1/3'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
            />
          </svg>
        </div>
      </div>
      <div className='flex items-center  justify-end gap-6  w-1/4 mx-4'>
        <div className='flex items-center text-white justify-end'>
          <AccountConnect />
        </div>
        {address && session && userData?.isFound && (
          <Avatar
            userName={session.user.name || ''}
            openId={userData?.open_ai_id}
            ipfsUrl={userData?.ipfs}
            avatarLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
