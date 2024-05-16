"use client"
import React, { useState } from 'react';

import ModelCard from '@/components/ui/modelCard';

import { IndianModelCardData, modelCardData } from '@/utils/modelData';




const MainComponent = () => {
  const [defaultModel, setDefaultModel] = useState(true)

  const modelData = defaultModel ? IndianModelCardData : modelCardData

  return (
    <div className='border-l-2 w-full  text-white border-l-[#433F48]'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-12 p-10'>
        {modelData.map((item, index) => (
          <React.Fragment key={index}>
            <ModelCard {...item} index={index + 1} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default MainComponent;
