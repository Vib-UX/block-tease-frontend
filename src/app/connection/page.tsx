'use client';
declare global {
  interface Window {
    ethereum: any;
  }
}
import detectEthereumProvider from '@metamask/detect-provider';
import React from 'react';

import { main } from '@/lib/func';

import Button from '@/components/buttons/Button';
const Connection = () => {
  const [account, setAccount] = React.useState<string | null>(null);
  const configureMoonbaseAlpha = async () => {
    const provider: any = await detectEthereumProvider({
      mustBeMetaMask: true,
    });
    if (provider) {
      try {
        await provider.request({ method: 'eth_requestAccounts' });
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x507',
              chainName: 'Moonbase Alpha',
              nativeCurrency: {
                name: 'DEV',
                symbol: 'DEV',
                decimals: 18,
              },
              rpcUrls: ['https://rpc.api.moonbase.moonbeam.network'],
              blockExplorerUrls: ['https://moonbase.moonscan.io/'],
            },
          ],
        });
      } catch (e) {
        console.error(e);
      }
    } else {
      console.error('Please install MetaMask');
    }
  };
  const getAccount = async () => {
    const acc = await window.ethereum.enable();
    setAccount(acc[0]);
  };
  const executer = async () => {
    console.log('exceuting');
    main();
  };
  React.useEffect(() => {
    getAccount();
  }, []);
  return (
    <>
      <Button onClick={() => configureMoonbaseAlpha()}>
        Conenct with moonbase alpha
      </Button>
      {account && <p>Connected with {account}</p>}
      <Button onClick={() => executer()}>TRANSACTION</Button>
    </>
  );
};

export default Connection;
