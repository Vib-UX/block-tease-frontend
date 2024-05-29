import {
  Button,
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  FacebookIcon,
  FacebookShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  XIcon,
} from 'react-share';

export default function ShareButton() {
  const [isOpen, setIsOpen] = useState(false);

  const path = usePathname();
  const title = 'Block tease';
  const url = ` https://block-tease.vercel.app${path}`;

  const [copied, setCopied] = useState(false);
  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }
  const copyToClipboard = () => {
    if (!copied) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => console.error('Failed to copy text: ', err));
    }
  };

  return (
    <>
      <Button
        onClick={open}
        className='rounded-md bg-black/20 py-2 px-4 flex items-center justify-center gap-2 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-4'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z'
          />
        </svg>
        Share
      </Button>

      <Transition appear show={isOpen}>
        <Dialog
          as='div'
          className='relative z-10  focus:outline-none'
          onClose={close}
        >
          <div className='fixed inset-0 z-10 mx-2 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4'>
              <TransitionChild
                enter='ease-out duration-300'
                enterFrom='opacity-0 transform-[scale(95%)]'
                enterTo='opacity-100 transform-[scale(100%)]'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 transform-[scale(100%)]'
                leaveTo='opacity-0 transform-[scale(95%)]'
              >
                <DialogPanel className=' max-w-md flex gap-4 flex-col items-center justify-start rounded-xl bg-white/5 p-6 backdrop-blur-2xl'>
                  <div className='mt-4 '>
                    <button
                      className={`inline-flex items-center gap-2 rounded-md py-1.5 px-3 text-sm font-semibold text-white  focus:outline-none ${
                        !copied
                          ? 'focus:bg-gray-700 hover:bg-[#fb0393]'
                          : 'bg-[#fb0393] cursor-not-allowed'
                      }`}
                      onClick={() => {
                        copyToClipboard();
                      }}
                      disabled={copied}
                      style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      <span className='overflow-hidden whitespace-nowrap'>
                        {url}
                      </span>
                    </button>
                  </div>
                  <div className='flex gap-x-5'>
                    <TwitterShareButton
                      url={url}
                      title={title}
                      className='Demo__some-network__share-button'
                    >
                      <XIcon size={32} round />
                    </TwitterShareButton>
                    <TelegramShareButton
                      url={url}
                      title={title}
                      className='Demo__some-network__share-button'
                    >
                      <TelegramIcon size={32} round />
                    </TelegramShareButton>
                    <FacebookShareButton
                      url={url}
                      className='Demo__some-network__share-button'
                    >
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <RedditShareButton
                      url={url}
                      title={title}
                      windowWidth={660}
                      windowHeight={460}
                      className='Demo__some-network__share-button'
                    >
                      <RedditIcon size={32} round />
                    </RedditShareButton>
                  </div>

                  {copied && (
                    <span className='text-[#fb0393] text-sm ml-2'>Copied!</span>
                  )}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
