'use client';
import {
  Button,
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import {
  useSwitchNetwork,
  useWeb3ModalAccount,
} from '@web3modal/ethers5/react';
import { ethers } from 'ethers';
import Image from 'next/image';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

import {
  approveNSubscribe,
  batchSubscribeFor,
  checkUserBalance,
  getTestFunds,
  mintingNft,
} from '@/lib/func';
import { cn, toastStyles } from '@/lib/utils';

import RippleLoader from '@/components/buttons/rippleLoader';
import LinearWithValueLabel from '@/components/ui/progressBar';
import { VanishInput } from '@/components/ui/vanishInput';

import { moonbase, morph, zkSync } from '@/app/Providers';

import moonBeamIcon from '../../../public/images/moonBeamIcon.png';
import morphLogo from '../../../public/images/morph.png';
import zksyncIcon from '../../../public/images/zkSynchIcon.png';

const subscriptionId = Math.floor(Math.random() * (1e12 - 1 + 1)) + 1;
export default function MyModal({
  setLocked,
  dialogFor,
  value,
  name,
  modelId,
  setIsUnlocked,
}: {
  setLocked?: React.Dispatch<React.SetStateAction<boolean>>;
  dialogFor: string | null;
  value: number;
  name?: string | null;
  modelId: number;
  setIsUnlocked: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [walletChosen, setWalletChosen] = useState('');
  const [batchGaslessTrx, setBatchGaslessTrx] = useState('');
  const [approvetrx, setApproveTrx] = useState('');
  const [testTokensHash, setTestTokensHash] = useState('');
  const [nftTrx, setNftTrx] = useState('');
  const [progress, setProgress] = React.useState(0);

  const { switchNetwork } = useSwitchNetwork();
  const { isConnected } = useWeb3ModalAccount();
  function open() {
    if (!isConnected) {
      return toast.error('Connect to a wallet', toastStyles);
    } else {
      setIsOpen(true);
    }
  }
  function close() {
    setIsOpen(false);
    setWalletChosen('');
  }
  const [provider, setProvider] = useState<any>(undefined);
  const [loadingState, setLoadingState] = useState<string>('Confirm Payment');
  const placeholders = [
    `We have notified ${name} 💃💌 of your interest. Hold on! ✨`,
    'She has accepted your request! 🎉🎈 Let the fun begin! 💋',
    `${name} 💃👯‍♀️ is getting ready for you. Relax! ⏳💆`,
    `She's right around the corner 👠. Sit tight! 💺💃`,
    'She is ready!🍾 Head over and enjoy the show! 🎵🥂',
  ];
  React.useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as any
      );
      setProvider(provider);
    }
  }, []);
  const mintNft = async (addr: string) => {
    setProgress(66);

    const res = await mintingNft({
      modelId: 5,
      subscriptionId: 18,
      duration: 3600,
      fromAddr: addr,
    });

    setNftTrx(res.trxHash);

    setProgress(100);
    toast.success('Transaction successfull 🚀', toastStyles);
  };
  const showMsgs = () => {
    setProgress(33);
    toast.success('Payment completed successfully', toastStyles);
  };
  const handleOperation = async (walletChosen: string) => {
    try {
      if (walletChosen === 'Morph') {
        setProgress(10);
        const resp = await approveNSubscribe({ provider, priceInUsd: value });
        console.log(resp);
        setApproveTrx(resp.hash);
        showMsgs();
        if (resp.fromAddr) {
          mintNft(resp.fromAddr);
        }
      } else if (walletChosen === 'MoonBeam') {
        setProgress(10);
        const resp = await batchSubscribeFor({
          modelId: modelId,
          subscriptionId: subscriptionId,
          priceInUsd: value,
          provider,
        });
        setBatchGaslessTrx(resp.dispatch);
        showMsgs();
        if (resp.dispatch) {
          // mintNft(resp.fromAddr);
          setProgress(100);
          toast.success('Transaction successfull 🚀', toastStyles);
          localStorage.setItem(
            modelId.toString(),
            (BigInt(1e18) * BigInt(modelId) + BigInt(subscriptionId)).toString()
          );
          setIsOpen(true);
          // setIsUnlocked(true);
        }
      }
    } catch (error) {
      setProgress(0);
      // toast.error('Something went wrong', toastStyles);
    }
  };
  const insufficiantBalance = async () => {
    const amount = provider && (await checkUserBalance(provider)).signerBalance;
    if (parseInt(amount) < value) {
      setLoadingState(
        `Insufficient Funds need ${value - amount} 💸 to Mint NFT`
      );
    }
  };
  React.useEffect(() => {
    insufficiantBalance();
  }, [walletChosen !== '']);
  console.log(isOpen);
  return (
    <>
      <button
        onMouseOver={() => setLocked && setLocked(false)}
        onMouseOut={() => setLocked && setLocked(true)}
        onClick={open}
        className=' cursor-pointer h-[37px] w-full group/button relative overflow-hidden rounded-md bg-[rgb(48,20,47)] bg-gradient-to-br from-[rgba(48,20,47,1)] from-[0%] to-[rgba(17,12,23,1)] to-[57%] px-5 py-1.5 text-xs font-medium text-[#fb0393] transition-all hover:border-red-500 active:scale-95'
      >
        <span className='absolute bottom-0 left-0 z-0 h-0 w-full bg-[#fb0393] transition-all duration-200 group-hover/button:h-full' />
        <span className='relative flex gap-2 justify-center items-center z-10 transition-all duration-500 group-hover/button:text-white'>
          {dialogFor === 'ends : 09h 36m 22s' ? <RippleLoader /> : null}
          {dialogFor}
          {value ? (
            <>
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
              {value}
            </>
          ) : null}
        </span>
      </button>

      <Transition appear show={isOpen}>
        <Dialog
          as='div'
          className='relative z-10 focus:outline-none'
          onClose={close}
        >
          <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4'>
              <TransitionChild
                enter='ease-out duration-300'
                enterFrom='opacity-0 transform-[scale(95%)]'
                enterTo='opacity-100 transform-[scale(100%)]'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 transform-[scale(100%)]'
                leaveTo='opacity-0 transform-[scale(95%)]'
              >
                <DialogPanel className='w-full max-w-xl  space-y-2 rounded-xl bg-white/5 p-10 backdrop-blur-2xl'>
                  <h1 className='text-2xl text-white'>Subscribe</h1>
                  <p className='text-white'>
                    Subscribe to get access to exclusive content
                  </p>

                  <div className='relative flex items-center gap-4 pb-32'>
                    {progress > 0 && progress < 99 && (
                      <span
                        className={cn(
                          'absolute left-1/2 w-full text-md text-center top-[60%] text-white -translate-x-1/2 -translate-y-1/2 z-50'
                        )}
                      >
                        <VanishInput
                          placeholders={placeholders}
                          progress={progress}
                        />
                      </span>
                    )}

                    <div className='absolute left-1/2 top-[62%] -translate-x-1/2 -translate-y-1/2 w-full'>
                      {(approvetrx || batchGaslessTrx || nftTrx) && (
                        <div
                          className={`flex items-center ${
                            batchGaslessTrx
                              ? 'justify-center'
                              : 'justify-between'
                          }  w-full py-3`}
                        >
                          <a
                            href={
                              walletChosen === 'Morph'
                                ? `${morph.explorerUrl}/tx/${approvetrx}`
                                : `${moonbase.explorerUrl}/tx/${batchGaslessTrx}`
                            }
                            target='_blank'
                            className='flex items-center text-white gap-1 hover:underline'
                          >
                            Payment success{' '}
                            <svg
                              stroke='currentColor'
                              fill='none'
                              stroke-width='2'
                              viewBox='0 0 24 24'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              height='1em'
                              width='1em'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                stroke='none'
                                d='M0 0h24v24H0z'
                                fill='none'
                              ></path>
                              <path d='M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6'></path>
                              <path d='M11 13l9 -9'></path>
                              <path d='M15 4h5v5'></path>
                            </svg>
                          </a>
                          {walletChosen !== 'MoonBeam' && (
                            <a
                              href={`https://testnets.opensea.io/assets/sepolia/0xB974E8Db0Ad4b573e8AFBC601146Fc8daE2FC4DD/${
                                BigInt(1e18) * BigInt(5) + BigInt(18)
                              }`}
                              target='_blank'
                              className='flex items-center text-white gap-1 hover:underline'
                            >
                              Nft Minted
                              <svg
                                stroke='currentColor'
                                fill='none'
                                stroke-width='2'
                                viewBox='0 0 24 24'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                                height='1em'
                                width='1em'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  stroke='none'
                                  d='M0 0h24v24H0z'
                                  fill='none'
                                ></path>
                                <path d='M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6'></path>
                                <path d='M11 13l9 -9'></path>
                                <path d='M15 4h5v5'></path>
                              </svg>
                            </a>
                          )}
                        </div>
                      )}
                      {testTokensHash && (
                        <div
                          className={`${
                            !nftTrx && 'mt-20'
                          } 'flex items-center w-full py-3'`}
                        >
                          <a
                            href={`${moonbase.explorerUrl}/tx/${testTokensHash}`}
                            target='_blank'
                            className='flex items-center text-white gap-1 hover:underline'
                          >
                            Test funds{' '}
                            <svg
                              stroke='currentColor'
                              fill='none'
                              stroke-width='2'
                              viewBox='0 0 24 24'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              height='1em'
                              width='1em'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                stroke='none'
                                d='M0 0h24v24H0z'
                                fill='none'
                              ></path>
                              <path d='M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6'></path>
                              <path d='M11 13l9 -9'></path>
                              <path d='M15 4h5v5'></path>
                            </svg>
                          </a>
                        </div>
                      )}
                    </div>

                    <Menu>
                      <MenuButton className='inline-flex z-20 items-center gap-4 rounded-md border-[#FB0393] bg-[#ff16b17c] hover:bg-[#ff16b1a2] py-2 px-6 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none  data-[open]:bg-[#fb039487] data-[focus]:outline-1 data-[focus]:outline-white'>
                        {!walletChosen ? 'Choose you blockchain' : walletChosen}
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
                            d='m19.5 8.25-7.5 7.5-7.5-7.5'
                          />
                        </svg>
                      </MenuButton>
                      <Transition
                        enter='transition ease-out duration-75'
                        enterFrom='opacity-0 scale-95 '
                        enterTo='opacity-100 scale-100'
                        leave='transition ease-in duration-100'
                        leaveFrom='opacity-100 scale-100'
                        leaveTo='opacity-1 scale-95'
                      >
                        <MenuItems
                          anchor='bottom'
                          className='w-52  origin-top-right z-30 rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white [--anchor-gap:var(--spacing-1)] focus:outline-none'
                        >
                          <MenuItem>
                            <button
                              onClick={() => {
                                switchNetwork(morph.chainId);
                                setWalletChosen('Morph');
                              }}
                              className='group flex w-full items-center gap-2 rounded-lg py-2.5 px-5 data-[focus]:bg-white/10'
                            >
                              <Image
                                src={morphLogo}
                                alt='morphIcon'
                                height={90}
                                width={90}
                              />
                            </button>
                          </MenuItem>
                          <MenuItem>
                            <button
                              onClick={() => {
                                switchNetwork(zkSync.chainId);
                                setWalletChosen('zksync');
                              }}
                              className='group  flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10'
                            >
                              <Image src={zksyncIcon} alt='zkSuncIcon' />
                              <p className=' text-lg '>zkSync</p>
                            </button>
                          </MenuItem>
                          <MenuItem>
                            <button
                              onClick={() => {
                                switchNetwork(moonbase.chainId);
                                setWalletChosen('MoonBeam');
                              }}
                              className='group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10'
                            >
                              <Image src={moonBeamIcon} alt='moonBeamIcon' />
                            </button>
                          </MenuItem>
                        </MenuItems>
                      </Transition>
                    </Menu>

                    <p className=' text-white '>
                      <svg
                        aria-label='USDC'
                        width='1em'
                        height='1em'
                        viewBox='0 0 32 32'
                        xmlns='http://www.w3.org/2000/svg'
                        className='inline-block size-[.8lh] shrink-0'
                      >
                        <g fill='none'>
                          <circle
                            cx='16'
                            cy='16'
                            r='16'
                            fill='#3E73C4'
                          ></circle>
                          <g fill='#FFF'>
                            <path d='M20.022 18.124c0-2.124-1.28-2.852-3.84-3.156c-1.828-.243-2.193-.728-2.193-1.578c0-.85.61-1.396 1.828-1.396c1.097 0 1.707.364 2.011 1.275a.458.458 0 0 0 .427.303h.975a.416.416 0 0 0 .427-.425v-.06a3.04 3.04 0 0 0-2.743-2.489V9.142c0-.243-.183-.425-.487-.486h-.915c-.243 0-.426.182-.487.486v1.396c-1.829.242-2.986 1.456-2.986 2.974c0 2.002 1.218 2.791 3.778 3.095c1.707.303 2.255.668 2.255 1.639c0 .97-.853 1.638-2.011 1.638c-1.585 0-2.133-.667-2.316-1.578c-.06-.242-.244-.364-.427-.364h-1.036a.416.416 0 0 0-.426.425v.06c.243 1.518 1.219 2.61 3.23 2.914v1.457c0 .242.183.425.487.485h.915c.243 0 .426-.182.487-.485V21.34c1.829-.303 3.047-1.578 3.047-3.217z'></path>
                            <path d='M12.892 24.497c-4.754-1.7-7.192-6.98-5.424-11.653c.914-2.55 2.925-4.491 5.424-5.402c.244-.121.365-.303.365-.607v-.85c0-.242-.121-.424-.365-.485c-.061 0-.183 0-.244.06a10.895 10.895 0 0 0-7.13 13.717c1.096 3.4 3.717 6.01 7.13 7.102c.244.121.488 0 .548-.243c.061-.06.061-.122.061-.243v-.85c0-.182-.182-.424-.365-.546zm6.46-18.936c-.244-.122-.488 0-.548.242c-.061.061-.061.122-.061.243v.85c0 .243.182.485.365.607c4.754 1.7 7.192 6.98 5.424 11.653c-.914 2.55-2.925 4.491-5.424 5.402c-.244.121-.365.303-.365.607v.85c0 .242.121.424.365.485c.061 0 .183 0 .244-.06a10.895 10.895 0 0 0 7.13-13.717c-1.096-3.46-3.778-6.07-7.13-7.162z'></path>
                          </g>
                        </g>
                      </svg>{' '}
                      {value}
                    </p>
                  </div>
                  {progress === 0 ? (
                    <>
                      <Button
                        disabled={
                          !walletChosen ||
                          (nftTrx ? true : false) ||
                          loadingState !== 'Confirm Payment'
                        }
                        onClick={() => handleOperation(walletChosen)}
                        className={cn(
                          `z-20 flex items-center justify-center w-full gap-2 rounded-md border-[#FB0393] bg-[#ff16b17c] hover:bg-[#ff16b1a2] py-2 px-10 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none  data-[open]:bg-[#fb039487] data-[focus]:outline-1 data-[focus]:outline-white`,
                          (!walletChosen ||
                            loadingState !== 'Confirm Payment') &&
                            'cursor-not-allowed opacity-50 '
                        )}
                      >
                        <p>{loadingState}</p>
                      </Button>
                      {loadingState !== 'Confirm Payment' && (
                        <div
                          className='text-end hover:underline cursor-pointer text-white'
                          onClick={async () => {
                            const resp = await getTestFunds(provider);
                            if (resp.trxhash) {
                              toast.success(
                                'Wooho your funds have arrived 🚀🎉💸',
                                toastStyles
                              );
                              setTestTokensHash(resp.trxhash);
                              setLoadingState('Confirm Payment');
                            } else {
                              toast.error('Something went wrong', toastStyles);
                              setTestTokensHash('');
                            }
                          }}
                        >
                          Get test funds{' '}
                          <svg
                            aria-label='USDC'
                            width='1em'
                            height='1em'
                            viewBox='0 0 32 32'
                            xmlns='http://www.w3.org/2000/svg'
                            className='inline-block size-[.8lh] shrink-0'
                          >
                            <g fill='none'>
                              <circle
                                cx='16'
                                cy='16'
                                r='16'
                                fill='#3E73C4'
                              ></circle>
                              <g fill='#FFF'>
                                <path d='M20.022 18.124c0-2.124-1.28-2.852-3.84-3.156c-1.828-.243-2.193-.728-2.193-1.578c0-.85.61-1.396 1.828-1.396c1.097 0 1.707.364 2.011 1.275a.458.458 0 0 0 .427.303h.975a.416.416 0 0 0 .427-.425v-.06a3.04 3.04 0 0 0-2.743-2.489V9.142c0-.243-.183-.425-.487-.486h-.915c-.243 0-.426.182-.487.486v1.396c-1.829.242-2.986 1.456-2.986 2.974c0 2.002 1.218 2.791 3.778 3.095c1.707.303 2.255.668 2.255 1.639c0 .97-.853 1.638-2.011 1.638c-1.585 0-2.133-.667-2.316-1.578c-.06-.242-.244-.364-.427-.364h-1.036a.416.416 0 0 0-.426.425v.06c.243 1.518 1.219 2.61 3.23 2.914v1.457c0 .242.183.425.487.485h.915c.243 0 .426-.182.487-.485V21.34c1.829-.303 3.047-1.578 3.047-3.217z'></path>
                                <path d='M12.892 24.497c-4.754-1.7-7.192-6.98-5.424-11.653c.914-2.55 2.925-4.491 5.424-5.402c.244-.121.365-.303.365-.607v-.85c0-.242-.121-.424-.365-.485c-.061 0-.183 0-.244.06a10.895 10.895 0 0 0-7.13 13.717c1.096 3.4 3.717 6.01 7.13 7.102c.244.121.488 0 .548-.243c.061-.06.061-.122.061-.243v-.85c0-.182-.182-.424-.365-.546zm6.46-18.936c-.244-.122-.488 0-.548.242c-.061.061-.061.122-.061.243v.85c0 .243.182.485.365.607c4.754 1.7 7.192 6.98 5.424 11.653c-.914 2.55-2.925 4.491-5.424 5.402c-.244.121-.365.303-.365.607v.85c0 .242.121.424.365.485c.061 0 .183 0 .244-.06a10.895 10.895 0 0 0 7.13-13.717c-1.096-3.46-3.778-6.07-7.13-7.162z'></path>
                              </g>
                            </g>
                          </svg>
                        </div>
                      )}
                    </>
                  ) : progress > 0 && progress < 99 ? (
                    <LinearWithValueLabel progress={progress} />
                  ) : null}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
