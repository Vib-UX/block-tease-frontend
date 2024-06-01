'use client';
import React, { useState } from 'react';

import ModelCard from '@/components/ui/modelCard';

import NotFound from '@/app/not-found';
import { IndianModelCardData, modelCardData } from '@/utils/modelData';
type Props = {
  params: {
    feed: string;
  };
};
const Page = ({ params }: Props) => {
  const [defaultModel, setDefaultModel] = useState(params.feed);

  const modelData =
    defaultModel === 'indian' ? IndianModelCardData : modelCardData;

  if (!defaultModel) <NotFound />;
  return (
    <div className='md:border-l-2 w-full   md:border-l-[#433F48]'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12 mt-4 p-3 xl:p-10'>
        {modelData.map((item, index) => (
          <React.Fragment key={index}>
            <ModelCard {...item} index={index + 1} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Page;
