import { motion } from "framer-motion";
import Image from 'next/image';
import { useState } from 'react';

import useGetSubscriptions, { CardData } from '@/hooks/useGetSubscriptions';

import ListingDialog from '@/components/ui/marketPlaceDialoge';

import Providers from '@/app/Providers';



const Subscriptions = () => {
  const { data, isSuccess } = useGetSubscriptions()

  const [selectedCards, setSelectedCards] = useState<CardData[]>([]);

  console.log(selectedCards, "selectedCards", data);


  const handleCheck = (card: CardData, isChecked: boolean) => {
    if (isChecked) {
      setSelectedCards(prevCards => [...prevCards, card]);
    } else {
      setSelectedCards(prevCards => prevCards.filter(c => c.modelId !== card.modelId));
    }
  };

  return (
    <Providers>
      <div className='w-full bg-black'>
        <h4 className='mt-6 ml-8 text-white'>Your subscriptions</h4>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12 p-10'>
          {/* {isSuccess && data ? data.map((item, index) =>
            <MarketPlaceCard key={index} {...item} index={index + 1} setSelectedProfiles={setSelectedProfiles} />
          ) : null} */}
          {isSuccess && data ? data.map((card, index) => (
            <MarketPlaceCard2 card={card} isChecked={selectedCards.some(selectedCard => selectedCard.modelId === card.modelId)} key={index} handleCheck={handleCheck} />
          )) : null}
        </div>
        {selectedCards.length > 0 &&
          <button
            style={{
              zIndex: 10000
            }}
            className=' cursor-pointer h-[37px] w-[30%] group/button fixed bottom-10 -translate-x-1/2 left-[60%] overflow-hidden rounded-md px-5 py-1.5 text-xs font-medium text-[#CEB9E9] transition-all hover:border-red-500 active:scale-95'
          >
            <span className='absolute w-full bottom-0 left-0 z-0  bg-[#fb0393] transition-all duration-200 h-full' />
            <span className='relative w-full flex gap-2 justify-center items-center z-10 transition-all duration-500 group-hover/button:text-white'>
              Renew Subscription
            </span>
          </button>
        }
      </div>
    </Providers>
  )
}

const MarketPlaceCard2 = ({
  card, handleCheck, isChecked
}: {
  isChecked: boolean;
  card: CardData,
  handleCheck: (card: CardData, isChecked: boolean) => void
}) => {

  return <div className='group wrapper z-10 relative overflow-hidden rounded-xl'>
    <div className='relative z-0 h-[300px]' key={card.modelId}>
      <Image
        height={200}
        width={200}
        src={card.ipfsData.image}
        priority
        alt='model'
        className='absolute top-0 left-0 w-full h-full object-cover rounded-xl transition-opacity duration-300 opacity-100 group-hover:opacity-80'
      />
      <div className="z-50 relative w-[100px] px-4 pt-4">
        <input type="checkbox" style={{ transform: "scale(2)" }} onChange={(e) => handleCheck(card, e.target.checked)} />
      </div>
      {/* Always visible text */}
      <div className='absolute bottom-0 left-0 w-full p-1 text-white group-hover:hidden block'>
        <div className='flex items-center justify-start gap-3 pb-2'>
          <div className='w-[40px] h-[40px] bg-white rounded-full overflow-hidden'>
            <Image
              height={200}
              width={200}
              src={card.ipfsData.image}
              alt='model icon'
              className='w-full h-full object-cover'
            />
          </div>
          <p className='capitalize text-md font-bold flex gap-1 justify-center items-center'>
            {/* {data.name}.Tease{' '} */}
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
                d='M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z'
              />
            </svg>
          </p>
        </div>
        <p>HOT COLLECTION</p>
      </div>

      {/* Revealing text */}
      <motion.div
        className='absolute bottom-0 left-0 w-full z-50 p-1  h-[40%] flex flex-col items-center justify-end'
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 20 }}
        whileHover={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2, ease: 'linear' }}
      >
        <div className='text-white w-full  '>
          <div className='flex items-center w-full justify-start gap-2 '>
            <div className='w-[40px] h-[40px] bg-white rounded-full overflow-hidden'>
              <Image
                src={card.ipfsData.image}
                height={200}
                width={200}
                alt='model icon'
                className='w-full h-full object-cover'
              />
            </div>
            <p className='capitalize text-md font-bold flex gap-1 justify-center items-center'>
              {card.modelName}.Tease{' '}
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
                  d='M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z'
                />
              </svg>
            </p>
          </div>
          <p>NFT COLLECTION</p>
          <p>List your nFt at the market place</p>
        </div>
        <ListingDialog
          icon={card.ipfsData.image}
          name={card.modelName}
          tokenId={card.tokenId}
          modelId={parseInt(card.modelId)}
        />
      </motion.div>
    </div>
  </div>

}

export default Subscriptions