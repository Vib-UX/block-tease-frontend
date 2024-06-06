import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import useGetSubscriptions, { CardData } from '@/hooks/useGetSubscriptions';
import useWeb3auth from '@/hooks/useWeb3auth';
import { executeSubscriptions } from '@/lib/moonBatchSomeSubs';

import BuyModal from '@/components/ui/BuyModal';

import Providers from '@/app/Providers';
import { toastStyles } from '@/lib/utils';
import Link from 'next/link';
import { checkBalances } from '@/lib/func';

const Subscriptions = () => {
  const { data, isSuccess, isFetching } = useGetSubscriptions();
  const { login } = useWeb3auth(2);
  const [txHash, setTxHash] = useState('');
  const [activeData, setActiveData] = useState<CardData | null>(null);
  const [type, setType] = useState<'single' | 'multiple'>('single');
  const [progress, setProgress] = useState(0);
  const [selectedCards, setSelectedCards] = useState<CardData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loadingState, setLoadingState] = useState<string>('Confirm Payment');
  const handleClick = async () => {
    try {
      setProgress(10);
      toast.loading('Awaiting transaction', toastStyles);
      const provider = await login(2);
      const subscriptions = selectedCards.map((card) => {
        const subscriptionId = Math.floor(Math.random() * (1e12 - 1 + 1)) + 1;
        return {
          modelId: card.modelId, // Unique identifier for the model
          subscriptionId: subscriptionId, // Randomly generated using the subscription function
          priceInUsd: card.modelPrice,
        };
      });
      const receipt = await executeSubscriptions(subscriptions, provider);
      setTxHash(receipt.dispatch);
      setProgress(100);
      toast.dismiss();
      toast.success('Transaction successful');
      setSelectedCards([]);
    } catch (error) {
      setProgress(0);
      toast.error('Transaction error');
    }
  };

  const handleClick2 = async (card: CardData) => {
    try {
      setProgress(10);
      toast.loading('Awaiting transaction');
      const provider = await login(2);

      const subscriptionId = Math.floor(Math.random() * (1e12 - 1 + 1)) + 1;
      const subscriptions = {
        modelId: card.modelId, // Unique identifier for the model
        subscriptionId: subscriptionId, // Randomly generated using the subscription function
        priceInUsd: card.modelPrice,
      };
      const receipt = await executeSubscriptions([subscriptions], provider);
      setTxHash(receipt.dispatch);
      setProgress(100);
      toast.dismiss();
      toast.success('Transaction successful');
      setSelectedCards([]);
    } catch (error) {
      setProgress(0);
      toast.error('Transaction error');
    }
  };

  const handleCheck = (card: CardData, isChecked: boolean) => {
    if (isChecked) {
      setSelectedCards((prevCards) => [...prevCards, card]);
    } else {
      setSelectedCards((prevCards) =>
        prevCards.filter((c) => c.modelId !== card.modelId)
      );
    }
  };

  const totalAmt = selectedCards.reduce((prev, curr) => {
    return prev + curr.modelPrice;
  }, 0);
  const insufficiantBalance = async () => {
    let amount = {
      signerBalance: '0',
    };

    const _provider = await login(2);
    const signer = _provider.getSigner();
    amount = await checkBalances(signer);
    const value =
      type === 'single' && activeData ? activeData.modelPrice : totalAmt;
    if (parseInt(amount.signerBalance) < value) {
      setLoadingState(
        `Insufficient Funds need ${
          value - parseInt(amount.signerBalance)
        }💸 to subscribe`
      );
    } else {
      setLoadingState('Confirm Payment');
    }
  };
  useEffect(() => {
    if (isOpen) {
      insufficiantBalance();
    }
  }, [isOpen]);
  return (
    <Providers>
      <BuyModal
        txHash={txHash}
        routeUsed='subs'
        cta={loadingState}
        progress={progress}
        setLoadingState={setLoadingState}
        listingPrice={
          type === 'single' && activeData
            ? activeData.modelPrice.toString()
            : totalAmt.toString()
        }
        // icon={selectActiveData.icon}
        icons={selectedCards.map((c) => c.ipfsData.image)}
        isOpen={isOpen}
        onClick={() => {
          if (type === 'multiple') {
            handleClick();
          } else if (type === 'single' && activeData) {
            handleClick2(activeData);
          }
        }}
        onClose={() => {
          setIsOpen(false);
          setProgress(0);
          setTxHash('');
        }}
      />
      <div className='w-full bg-black'>
        <div className='h-[40px]' />
        <div className='flex items-center justify-between px-5'>
          <div>
            <h4 className='mt-6 ml-8 text-white font-bold text-xl'>
              Your subscriptions{' '}
            </h4>
          </div>
          {selectedCards.length > 0 && (
            <div className='flex items-center text-white justify-center'>
              <div className='flex items-center gap-x-1'>
                Total {totalAmt}{' '}
                <svg
                  aria-label='USDC'
                  width='.5em'
                  height='.5em'
                  viewBox='0 0 32 32'
                  xmlns='http://www.w3.org/2000/svg'
                  className='inline-block size-[.7lh] shrink-0'
                >
                  <g fill='none'>
                    <circle cx='16' cy='16' r='16' fill='#3E73C4'></circle>
                    <g fill='#FFF'>
                      <path d='M20.022 18.124c0-2.124-1.28-2.852-3.84-3.156c-1.828-.243-2.193-.728-2.193-1.578c0-.85.61-1.396 1.828-1.396c1.097 0 1.707.364 2.011 1.275a.458.458 0 0 0 .427.303h.975a.416.416 0 0 0 .427-.425v-.06a3.04 3.04 0 0 0-2.743-2.489V9.142c0-.243-.183-.425-.487-.486h-.915c-.243 0-.426.182-.487.486v1.396c-1.829.242-2.986 1.456-2.986 2.974c0 2.002 1.218 2.791 3.778 3.095c1.707.303 2.255.668 2.255 1.639c0 .97-.853 1.638-2.011 1.638c-1.585 0-2.133-.667-2.316-1.578c-.06-.242-.244-.364-.427-.364h-1.036a.416.416 0 0 0-.426.425v.06c.243 1.518 1.219 2.61 3.23 2.914v1.457c0 .242.183.425.487.485h.915c.243 0 .426-.182.487-.485V21.34c1.829-.303 3.047-1.578 3.047-3.217z'></path>
                      <path d='M12.892 24.497c-4.754-1.7-7.192-6.98-5.424-11.653c.914-2.55 2.925-4.491 5.424-5.402c.244-.121.365-.303.365-.607v-.85c0-.242-.121-.424-.365-.485c-.061 0-.183 0-.244.06a10.895 10.895 0 0 0-7.13 13.717c1.096 3.4 3.717 6.01 7.13 7.102c.244.121.488 0 .548-.243c.061-.06.061-.122.061-.243v-.85c0-.182-.182-.424-.365-.546zm6.46-18.936c-.244-.122-.488 0-.548.242c-.061.061-.061.122-.061.243v.85c0 .243.182.485.365.607c4.754 1.7 7.192 6.98 5.424 11.653c-.914 2.55-2.925 4.491-5.424 5.402c-.244.121-.365.303-.365.607v.85c0 .242.121.424.365.485c.061 0 .183 0 .244-.06a10.895 10.895 0 0 0 7.13-13.717c-1.096-3.46-3.778-6.07-7.13-7.162z'></path>
                    </g>
                  </g>
                </svg>
              </div>
              &nbsp;&nbsp;
              <button
                style={{
                  zIndex: 10000,
                }}
                onClick={() => {
                  setType('multiple');
                  setIsOpen(true);
                }}
                className='cursor-pointer h-[40px] w-[100px] relative group/button px-5 py-1.5 text-xs font-medium text-[#CEB9E9] transition-all hover:border-red-500 active:scale-95'
              >
                <span className='absolute w-full bottom-0 left-0 z-0  bg-[#fb0393] transition-all duration-200 h-full rounded-lg' />
                <span className='relative w-full flex gap-2 justify-center items-center z-10 transition-all duration-500 group-hover/button:text-white rounded-lg'>
                  {selectedCards.length > 1
                    ? `Renew (${selectedCards.length})`
                    : 'Renew'}
                </span>
              </button>
            </div>
          )}
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12 p-10'>
          {isSuccess && data
            ? data.map((card, index) => (
                <MarketPlaceCard2
                  card={card}
                  key={index}
                  handleCheck={handleCheck}
                  onRenew={() => {
                    setType('single');
                    setIsOpen(true);
                    setActiveData(card);
                  }}
                />
              ))
            : null}
        </div>
        {!data && !isFetching && (
          <p className='text-white text-3xl font-bold px-10 w-full text-center leading-relaxed'>
            You don't have any subscriptions yet.
            <br />
            <Link href={'/feed'} className='text-[#d946ef]'>
              Buy
            </Link>{' '}
            some subscriptions to get started.
          </p>
        )}
      </div>
    </Providers>
  );
};

const MarketPlaceCard2 = ({
  card,
  handleCheck,
  onRenew,
}: {
  card: CardData;
  handleCheck: (card: CardData, isChecked: boolean) => void;
  onRenew: (card: CardData) => void;
}) => {
  return (
    <div className='group wrapper z-10 relative overflow-hidden rounded-xl'>
      <div className='relative z-0 h-[300px]' key={card.modelId}>
        <Image
          height={200}
          width={200}
          src={card.ipfsData.image}
          priority
          alt='model'
          className='absolute top-0 left-0 w-full h-full object-cover opacity-80 rounded-xl transition-opacity duration-300 '
        />
        <div className='z-50 relative w-[100px] px-4 pt-4'>
          <input
            type='checkbox'
            style={{
              transform: 'scale(1.2)',
              appearance: 'none',
              backgroundColor: '#fb0393', // Change this to your desired color
              border: '1px solid #cacece',
              boxShadow:
                '0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05)',
              padding: '9px',
              borderRadius: '3px',
              display: 'inline-block',
              position: 'relative',
            }}
            onChange={(e) => handleCheck(card, e.target.checked)}
          />
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
          <div className='h-[40px]' />
        </div>
        <motion.div className='absolute bottom-0 left-0 w-full z-50 p-1  h-fit flex flex-col items-center justify-end'>
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
  );
};

export default Subscriptions;
