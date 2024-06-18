import { baseSepolia } from 'viem/chains';

import { generateContractHook } from '@/hooks/contracts';

import { abi } from './PaymasterBundlerABI';

export const usePaymasterBundlerContract = generateContractHook({
  abi: abi,
  [baseSepolia.id]: {
    chain: baseSepolia,
    address: '0x57eB75Df7f17aA5351f850040EeD5c66F945dF32',
  },
});
