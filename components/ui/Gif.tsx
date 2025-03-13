"use client";
import React, { use } from 'react';
import Image from 'next/image';

export const Gif = () => {
  return (
    <div className=''>
      <Image 
        src="/dark_matter.gif" 
        alt="Dark Matter" 
        width={500} 
        height={500} 
        layout="intrinsic" 
        priority
      />
      
    </div>
  );
};
