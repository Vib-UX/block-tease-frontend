'use client';

import Image from 'next/image';
import Link from 'next/link';
import '@/lib/env';

import BorderGlowButton from '@/components/buttons/shimmerButton';
import ScreenSaver from '@/components/ui/screenSaver';

import firstScreenBg from '../../public/images/firstScreenBg.png';
import logo from '../../public/images/logo.png';
import mobileScreenBg from '../../public/images/mobleFirstscreen.png';
import qr from '../../public/images/qr.png';
export default function HomePage() {
  return (
    <main className='  text-[#AAAAAA] font-bold relative w-full h-full '>
      <Image
        src={firstScreenBg}
        alt='backgrond iamge'
        className=' w-full h-screen z-10   hidden lg:block'
      />
      <Image
        src={mobileScreenBg}
        alt='backgrond iamge'
        className=' w-full h-screen z-10   block lg:hidden '
      />
      <div className='w-[31.2%] hidden lg:block h-[33.3%] bg-[rgb(148,60,255)] bg-gradient-to-r from-[#943cff] to-[rgba(251,3,147,1)]  absolute top-[46%] left-[26.8%] -translate-x-1/2 -translate-y-1/2 rounded-md'>
        <ScreenSaver />
      </div>

      <div className='absolute top-0 flex flex-col w-full h-full    right-0  lg:w-1/2   '>
        <div className=' flex flex-col items-center    w-full h-full  '>
          <Image src={logo} priority alt='logo' width={300} height={200} />

          <div className='flex flex-col items-center h-full  justify-evenly '>
            <p className='   text-base lg:text-xl font-medium bg-[rgb(148,60,255)] bg-gradient-to-r from-[#943cff] to-[rgba(251,3,147,1)] bg-clip-text text-transparent text-center'>
              "Empower your content, <br />
              redefine connection."
            </p>
            <p className=' text-center font-bold  text-base lg:text-2xl  lg:leading-8   text-white '>
              We know you are Excited! <br />
              Simple Verification & you are sorted.
            </p>
            <div className='flex relative flex-col justify-evenly items-center  '>
              <Image priority src={qr} alt='logo' height={250} width={250} />
              <div className='sm:absolute left-full w-[100px] top-1/3 md:translate-x-[10%] translate-y-1/3 justify-center  flex items-center'>
                <Image
                  src='https://assets-global.website-files.com/637359c81e22b715cec245ad/63dc31f8817a4a509d7635a7_Logo.svg'
                  height={200}
                  width={200}
                  alt='polygon_logo'
                />{' '}
                <div>🆔</div>
              </div>

              <div className='flex flex-col items-center gap-1 md:gap-2 pt-5 lg:pt-0'>
                <p className='bg-[rgb(255,255,255)]  bg-gradient-to-r from-[rgba(255,255,255,1)] to-[rgba(255,60,212,1)] bg-clip-text text-transparent text-center font-bold text-lg '>
                  Scan to verify 18+
                </p>
                <p>or</p>
                <Link href='feed'>
                  <BorderGlowButton buttonFor='Skip for now ' />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
