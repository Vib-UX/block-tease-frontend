import { BiconomySmartAccountV2 } from '@biconomy/account';
import { create } from 'zustand';


interface GlobalStore {
  smartAccount: BiconomySmartAccountV2 | null
  setSmartAccount: (smartAccount: BiconomySmartAccountV2) => void
}

const useGlobalStore = create<GlobalStore>()(
  (set) => ({
    smartAccount: null,
    setSmartAccount: (smartAccount) => set({ smartAccount: smartAccount }),
  }),
)

export default useGlobalStore