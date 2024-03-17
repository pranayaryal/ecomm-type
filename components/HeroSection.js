import React from 'react'


const HeroSection = () => {
    return (
      <div className='grid grid-cols-1 gap-y-4 md:gap-y-0 md:grid-cols-2 px-0 md:gap-x-8 md:auto-cols-fr py-[20px] justify-center'>
        <div className='flex items-start flex-col justify-center'>
          <h1 className='text-4xl mb-4'>Stop wasting time on security questionnaires</h1>
          <p>HyperComply is the easiest way for InfoSec and Sales leaders to share compliance information, automate security questionnaires, and accelerate sales.</p>
          <button className='hidden md:block mt-4 rounded-md border-2 border-[#273720] px-3 py-3 bg-yellow-custom text-sm'>Request a demo</button>


        </div>
        <div className='flex items-end flex-col justify-center'>
          <img src='https://assets-global.website-files.com/630955d355f57f38b7c3b1f5/656672e22bde4288b4d6e502_homepage-screenshot-xsm.webp' />

        </div>

      </div>
    )
}


export default HeroSection

