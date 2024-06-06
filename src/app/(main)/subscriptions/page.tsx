
'use client'

import { QueryClient, QueryClientProvider } from 'react-query'

import Subscriptions from '@/app/(main)/subscriptions/Subscriptions'
const queryClient = new QueryClient()

const SubscriptionPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Subscriptions />
    </QueryClientProvider>
  )
}

export default SubscriptionPage