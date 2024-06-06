import { useQuery } from 'react-query';

import useWeb3auth from '@/hooks/useWeb3auth';
import { getModalPayment } from '@/lib/func';

import { allModelData } from '@/utils/modelData';

export interface CardData {
  ipfsUrl: string;
  isListed: boolean;
  modelId: string;
  modelName: string;
  price: string;
  tokenId: string;
  ipfsData: {
    description: string;
    image: string;
    name: string
  }
  modelPrice: number
}

const filterMatchingIds = (array1: any, array2: any) => {
  const filteredArray = array1.filter((item1: any) => {
    return array2.some((item2: any) => {
      return item1.modelId === item2.id.toString();
    });
  }).filter((s) => !s.isListed);
  return filteredArray as CardData[];
};

const useGetSubscriptions = () => {
  const { email } = useWeb3auth()
  return useQuery([email, "subscription"], async (): Promise<CardData[]> => {
    if (!email) return []
    const response = await fetch(
      `https://db-graph-backend.onrender.com/api/user-info-moonbeam?email=${email}`
    );
    const jsonData = await response.json();
    const goodData = filterMatchingIds(jsonData.data.subscriptions, allModelData);
    const data = await Promise.all(goodData.map(async (card: CardData) => {
      const response = await fetch(card.ipfsUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const ipfsData = await response.json(); // Await the json data
      const price = await getModalPayment(parseInt(card.modelId))
      return { ...card, ipfsData, modelPrice: parseFloat(price) }; // Spread the card data and add ipfsData
    }));

    return data;
  })
}

export default useGetSubscriptions