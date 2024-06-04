'use client';

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '6ed6fe368b4f9474dcce0b29f61974b7';

export const moonbase = {
  chainId: 1287,
  name: 'Moonbase Alpha',
  currency: 'DEV',
  rpcUrl: 'https://moonbase-alpha.drpc.org',
  explorerUrl: 'https://moonbase.moonscan.io',
};
export const polygonAmoy = {
  chainId: 80002,
  name: 'Polygon Amoy',
  currency: 'MATIC',
  rpcUrl: 'https://rpc-amoy.polygon.technology',
  explorerUrl: 'https://www.oklink.com/amoy',
};
export const zkSync = {
  chainId: 300,
  name: 'zkSync Era Sepolia Testnet',
  currency: 'ETH',
  rpcUrl: 'https://sepolia.era.zksync.dev',
  explorerUrl: 'https://sepolia.explorer.zksync.io',
};
export const morph = {
  chainId: 2810,
  name: 'Morph Holesky Testnet',
  currency: 'ETH',
  rpcUrl: 'https://rpc-quicknode-holesky.morphl2.io',
  explorerUrl: 'https://explorer-holesky.morphl2.io',
};

const avalanche = {
  chainId: 43113,
  name: 'Avalanche FUJI C-Chain',
  currency: 'AVAX',
  rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
  explorerUrl: 'https://testnet.snowtrace.io',
};

// 3. Create a metadata object
const metadata = {
  name: 'BlockTease',
  description: 'OnlyFans for web3',
  url: 'https://block-tease.vercel.app/', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/'],
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: '...', // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK
});

// 5. Create a Web3Modal instance
createWeb3Modal({
  defaultChain: avalanche,
  ethersConfig,
  chains: [avalanche, moonbase, zkSync, morph],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});

function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      {children}
    </>
  );
}
export default Providers;
