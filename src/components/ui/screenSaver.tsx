import Image from "next/image";
import image1 from "public/screenSaver/image1.png"
import image2 from "public/screenSaver/image2.png"
import image3 from "public/screenSaver/image3.png"
import image4 from "public/screenSaver/image4.png"
import image5 from "public/screenSaver/image5.png"
import image6 from "public/screenSaver/image6.png"
import React from "react";
import { Autoplay, Pagination } from "swiper/modules";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";



export default function ScreenSaver() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination]}
        className="mySwiper w-full h-full">
        <SwiperSlide className="bg-black w-full h-full"><Image src={image1} alt="image1" className=" object-cover" /></SwiperSlide>
        <SwiperSlide className="bg-black w-full h-full"><Image src={image2} alt="image2" className=" object-cover" /></SwiperSlide>
        <SwiperSlide className="bg-black w-full h-full"><Image src={image3} alt="image3" className=" object-cover" /></SwiperSlide>
        <SwiperSlide className="bg-black w-full h-full"><Image src={image4} alt="image4" className=" object-cover" /></SwiperSlide>
        <SwiperSlide className="bg-black w-full h-full"><Image src={image5} alt="image5" className=" object-cover" /></SwiperSlide>
        <SwiperSlide className="bg-black w-full h-full"><Image src={image6} alt="image6" className=" object-cover" /></SwiperSlide>

      </Swiper>
    </>
  );
}
