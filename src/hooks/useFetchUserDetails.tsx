import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

const useFetchUserDetails = () => {
  const { address } = useAccount()
  return useQuery({
    queryKey: ["user-data", !!address],
    enabled: !!address,
    queryFn: async () => {
      const resp = await fetch(
        `https://db-graph-backend.onrender.com/api/user-info?wallet_address=${address}`,
        {
          method: 'GET',
        }
      );
      const data = await resp.json();
      if (data.success) {
        return {
          isFound: true,
          open_ai_id: data.data.user.openAi_tokenId,
          ipfs: data.data.user.ipfs_url
        }
      } else if (data.message === 'User not found') {
        return {
          isFound: false,
        }
      }
    },
    refetchOnWindowFocus: false
  })
}

export default useFetchUserDetails