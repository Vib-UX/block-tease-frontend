import { ConnectAccount } from '@coinbase/onchainkit/wallet';
import { useAccount, useChainId, useConnect, useDisconnect } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';


/**
 * AccountConnect
 *  - Connects to the wallet
 *  - Disconnects from the wallet
 *  - Displays the wallet network
 */
function AccountConnect() {
  const account = useAccount();
  const { status } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();


  return (
    <div
      className="flex flex-grow"
    // {...(status === 'pending' && {
    //   'aria-hidden': true,
    //   style: {
    //     pointerEvents: 'none',
    //     userSelect: 'none',
    //   },
    // })}
    >
      {(() => {
        if (account.status === 'disconnected') {
          return <ConnectAccount />
        }

        if (account.status === 'connected' && chainId !== baseSepolia.id) {
          return (
            <button
              onClick={() => disconnect()}
              className='z-30 relative bg-gradient-to-b from-[#FB0393] to-[#9A3CFF] font-bold rounded-md text-white py-2 px-4'
            >
              Wrong network
            </button>
          );
        }

        if (account.status === 'reconnecting') {
          return <button
            className='z-30 relative bg-gradient-to-b from-[#FB0393] to-[#9A3CFF] font-bold rounded-md text-white py-2 px-4'
          >
            Connecting...
          </button>
        }

        if (account.status === 'connected') {
          return <button
            onClick={() => disconnect()}
            className='z-30 relative bg-gradient-to-b from-[#FB0393] to-[#9A3CFF] font-bold rounded-md text-white py-2 px-4'
          >
            {account.address.slice(0, 4) + "..." + account.address.slice(account.address.length - 4, account.address.length - 1)}
          </button>
        }

        return (
          <button
            className='z-30 relative bg-gradient-to-b  from-[#FB0393] to-[#9A3CFF] font-bold rounded-md text-white py-2 px-4'
          >
            CC
          </button>
        );
      })()}
    </div >
  );
}

export default AccountConnect;
