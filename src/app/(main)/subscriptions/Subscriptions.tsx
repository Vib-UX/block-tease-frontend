import { motion } from "framer-motion";
import Image from 'next/image';
import { useState } from 'react';
import toast from "react-hot-toast";

import useGetSubscriptions, { CardData } from '@/hooks/useGetSubscriptions';
import useWeb3auth from "@/hooks/useWeb3auth";
import { executeSubscriptions } from "@/lib/moonBatchSomeSubs";

import BuyModal from "@/components/ui/BuyModal";

import Providers from '@/app/Providers';


const Subscriptions = () => {
  const { data, isSuccess } = useGetSubscriptions()
  const { login } = useWeb3auth(2)
  const [txHash, setTxHash] = useState('')
  const [activeData, setActiveData] = useState<CardData | null>(null)
  const [type, setType] = useState<"single" | "multiple">("single")
  const [progress, setProgress] = useState(0);
  const [selectedCards, setSelectedCards] = useState<CardData[]>([]);
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = async () => {
    try {
      setProgress(10)
      toast.loading("Awaiting transaction")
      const provider = await login(2)
      const subscriptions = selectedCards.map((card) => {
        const subscriptionId = Math.floor(Math.random() * (1e12 - 1 + 1)) + 1
        return {
          modelId: card.modelId,           // Unique identifier for the model
          subscriptionId: subscriptionId,  // Randomly generated using the subscription function
          priceInUsd: card.modelPrice
        }
      })
      const receipt = await executeSubscriptions(subscriptions, provider)
      setTxHash(receipt.dispatch)
      setProgress(100)
      toast.dismiss()
      toast.success("Transaction successful")
    } catch (error) {
      setProgress(0)
      toast.error("Transaction error")
    }
  }

  const handleClick2 = async (card: CardData) => {
    try {
      setProgress(10)
      toast.loading("Awaiting transaction")
      const provider = await login(2)

      const subscriptionId = Math.floor(Math.random() * (1e12 - 1 + 1)) + 1
      const subscriptions = {
        modelId: card.modelId,           // Unique identifier for the model
        subscriptionId: subscriptionId,  // Randomly generated using the subscription function
        priceInUsd: card.modelPrice
      }
      const receipt = await executeSubscriptions([subscriptions], provider)
      setTxHash(receipt.dispatch)
      setProgress(100)
      toast.dismiss()
      toast.success("Transaction successful")
    } catch (error) {
      setProgress(0)
      toast.error("Transaction error")
    }
  }


  const handleCheck = (card: CardData, isChecked: boolean) => {
    if (isChecked) {
      setSelectedCards(prevCards => [...prevCards, card]);
    } else {
      setSelectedCards(prevCards => prevCards.filter(c => c.modelId !== card.modelId));
    }
  };

  const totalAmt = selectedCards.reduce((prev, curr) => {
    return prev + (curr.modelPrice)
  }, 0)

  return (
    <Providers>
      <BuyModal
        txHash={txHash}
        cta={activeData ? "Buy Subscription" : "Buy Subscriptions"}
        progress={progress}
        listingPrice={activeData ? activeData.price : totalAmt.toString()}
        // icon={selectActiveData.icon}
        icons={selectedCards.map((c) => c.ipfsData.image)}
        isOpen={isOpen}
        onClick={() => {
          if (type === "multiple") {
            handleClick()
          } else if (type === "single" && activeData) {
            handleClick2(activeData)
          }
        }}
        onClose={() => {
          setIsOpen(false)
          setProgress(0)
          setTxHash("")
          setSelectedCards([])
        }}
      />
      <div className='w-full bg-black'>
        <div className="h-[40px]" />
        <div className="flex items-center justify-between px-5">
          <div>
            <h4 className='mt-6 ml-8 text-white'>Your subscriptions </h4>
          </div>
          {selectedCards.length > 0 &&
            <div className="flex items-center text-white justify-center">
              <div>Total {totalAmt} USDC</div>&nbsp;&nbsp;
              <button
                style={{
                  zIndex: 10000
                }}
                onClick={() => {
                  setType("multiple")
                  setIsOpen(true)
                }}
                className=' cursor-pointer h-[37px] w-[100px] relative group/button rounded-md px-5 py-1.5 text-xs font-medium text-[#CEB9E9] transition-all hover:border-red-500 active:scale-95'
              >
                <span className='absolute w-full bottom-0 left-0 z-0  bg-[#fb0393] transition-all duration-200 h-full' />
                <span className='relative w-full flex gap-2 justify-center items-center z-10 transition-all duration-500 group-hover/button:text-white'>
                  Renew
                </span>
              </button>
            </div>
          }
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12 p-10'>
          {isSuccess && data ? data.map((card, index) => (
            <MarketPlaceCard2 card={card} key={index} handleCheck={handleCheck} onRenew={() => {
              setType("single")
              setIsOpen(true)
              setActiveData(card)
            }} />
          )) : null}
        </div>

      </div>
    </Providers>
  )
}

const MarketPlaceCard2 = ({
  card, handleCheck,
  onRenew
}: {
  card: CardData,
  handleCheck: (card: CardData, isChecked: boolean) => void
  onRenew: (card: CardData) => void
}) => {
  return <div className='group wrapper z-10 relative overflow-hidden rounded-xl'>
    <div className='relative z-0 h-[300px]' key={card.modelId}>
      <Image
        height={200}
        width={200}
        src={card.ipfsData.image}
        priority
        alt='model'
        className='absolute top-0 left-0 w-full h-full object-cover opacity-80 rounded-xl transition-opacity duration-300 '
      />
      <div className="z-50 relative w-[100px] px-4 pt-4">
        <input type="checkbox"
          style={{
            transform: "scale(1.2)",
            appearance: "none",
            backgroundColor: "#fb0393", // Change this to your desired color
            border: "1px solid #cacece",
            boxShadow: "0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05)",
            padding: "9px",
            borderRadius: "3px",
            display: "inline-block",
            position: "relative"
          }}
          onChange={(e) => handleCheck(card, e.target.checked)} />
      </div>
      <div className='absolute bottom-0 left-0 w-full p-1 text-white '>
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
            {card.ipfsData.name}.Tease{' '}
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
        <div className="h-[40px]" />
      </div>
      <motion.div
        className='absolute bottom-0 left-0 w-full z-50 p-1  h-fit flex flex-col items-center justify-end'
      >
        <button
          onClick={() => onRenew(card)}
          className=' cursor-pointer h-[40px] mt-2 w-full group/button relative overflow-hidden rounded-md bg-[rgb(48,20,47)] bg-gradient-to-br from-[rgba(48,20,47,1)] from-[0%] to-[rgba(17,12,23,1)] to-[57%] px-5 py-1.5 text-xs font-medium text-[#fb0393] transition-all hover:border-red-500 active:scale-95'
        >
          <span className='absolute bottom-0 left-0 z-0 h-0 w-full bg-[#fb0393] transition-all duration-200 group-hover/button:h-full' />
          <span className='relative flex gap-2 justify-center items-center z-10 transition-all duration-500 group-hover/button:text-white'>
            Renew subscription
          </span>
        </button>
      </motion.div>
    </div>
  </div>

}

export default Subscriptions