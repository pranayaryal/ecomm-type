import React from 'react'
import FooterLogo from './FooterLogo'

export default function Footer() {
  return (
    <div className='mt-8 bg-dark-slate-grey text-white-smoke flex items-center justify-center flex-wrap pl-0 pr-0 relative'>
      <div className='z-5 max-w-[1400px] w-[90%] pt-[4rem] pb-[8rem] relative'>
        <div className='grid gap-x-8 gap-y-8 grid-cols-4 items-start justify-start'>
          <FooterLogo />
          <div className='flex flex-col space-y-4'>
            <p>Legal</p>
            <p>Privacy Policy</p>
            <p>Trust Page</p>

          </div>
          <div className='flex flex-col space-y-4'>
            <p>Contact</p>
            <p>Email us</p>
            <p>Support</p>
          </div>
          <div className='flex flex-col space-y-4'>
            <p>About</p>
            <p>Company</p>
            <p>Support</p>
          </div>

        </div>

      </div>
    </div>
  )
}
