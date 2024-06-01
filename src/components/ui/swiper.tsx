import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

import { CardStack } from '@/components/ui/card-stack';

import { MarketPlaceCardData } from '@/utils/modelData';

export default function App() {


  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={20}
      freeMode={true}
      pagination={{ clickable: true, }}
      speed={8000}

      autoplay={{
        delay: 3000, disableOnInteraction: true,
        pauseOnMouseEnter: true,

      }}
      loop={true}
      navigation={true}
      modules={[FreeMode, Autoplay, Pagination, Navigation]}
      style={{

        width: 1100, height: 400,
      }}
      className='mySwiper'
    >
      {MarketPlaceCardData.map((data) => {

        return (
          <SwiperSlide className='' key={data.id} style={{ width: 400, position: "relative", height: 350, borderRadius: 10, backgroundColor: "#2B213B" }}>
            <CardStack items={data.images} />
            <div className='group flex px-4 items-center capitalize gap-4 text-[#CEB9E9] py-4 absolute border-t rounded-t-lg border-fuchsia-500 w-full top-full left-0 -translate-y-full bg-gradient-to-br from-[#291D31] from-[0%] via-[190F1F] via-[74%] to-[#190F1F] to-[99%]'>
              <Image src={data.icon} alt="asfasdf" className='w-16 h-14 rounded-full ' />
              <div className='flex w-full flex-col justify-center gap-2 items-start'>
                <p className='capitalize text-sm flex gap-1 justify-center items-center'>{data.name.split(" ")[0]}.Tease <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                </svg>
                </p>

                <div className='group flex-col gap-4 w-full transition-all ease-in-out  items-center justify-between'>
                  <div className='group-hover:hidden flex justify-between w-full gap-4 '>
                    <span className='flex gap-1 text-sm items-center font-light'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-4 h-4'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z'
                        />
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                        />
                      </svg>
                      {data.views}M
                    </span>
                    <span className='flex gap-1 text-sm items-center font-light'>
                      <svg className='w-4 h-4' viewBox="0 0 29 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.59901 17.6116C2.25123 18.2415 2.95961 18.8155 3.71604 19.327C3.91455 19.4635 4.17672 19.4797 4.39181 19.3687C4.60689 19.2577 4.73736 19.0388 4.72808 18.8046C4.55306 14.947 4.90017 3.02643 15.5352 0.0234903C15.743 -0.0349206 15.9674 0.0173659 16.1242 0.160692C16.281 0.304018 16.3463 0.51666 16.2956 0.718671C13.5438 11.8994 20.4363 15.3139 23.5687 10.0369C23.6699 9.86162 23.8595 9.75006 24.0682 9.7429C24.2769 9.73575 24.4742 9.83404 24.5883 10.0019C27.3254 14.0605 26.6031 17.6919 25.8687 19.5874C25.7473 19.9107 25.8467 20.2724 26.1183 20.4963C26.3899 20.7203 26.7775 20.7599 27.0922 20.596C27.5548 20.352 27.9806 20.0486 28.358 19.6943C28.4524 19.6078 28.5914 19.5834 28.7116 19.6322C28.8319 19.6809 28.9104 19.7936 28.9115 19.9189V19.927C28.9145 27.4061 22.7392 33.5412 14.9505 33.7972C7.16182 34.0532 0.563646 28.3379 0.0334209 20.8761C-0.0320938 19.9482 -0.00123588 19.0163 0.125539 18.0942C0.167262 17.779 0.39238 17.5142 0.705695 17.4117C1.01901 17.3092 1.3658 17.3869 1.59942 17.612L1.59901 17.6116Z" fill="#F1673D" />
                      </svg>
                      {data.Tease}K
                    </span>
                    <span className=' flex gap-1 items-center text-sm  font-light'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-4 h-4'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941'
                        />
                      </svg>
                      93%
                    </span>
                  </div>

                  <div


                    className='w-full hidden group-hover:block'>
                    <Link href={`/profile/${data.slug}`}>
                      <button

                        className='cursor-pointer h-[30px] w-full group/button relative overflow-hidden rounded-md bg-[rgb(48,20,47)] bg-gradient-to-br from-[rgba(48,20,47,1)] from-[0%] to-[rgba(17,12,23,1)] to-[57%] px-5 py-1.5 text-xs font-medium text-[#CEB9E9] transition-all hover:border-red-500 active:scale-95'
                      >
                        <span className='absolute w-full bottom-0 left-0 z-0 h-0 bg-[#fb0393] transition-all duration-200 group-hover/button:h-full' />
                        <span className='relative capitalize w-full flex gap-2 justify-center items-center z-10 transition-all duration-500 group-hover/button:text-white'>
                          view Full Profile
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  );
}
