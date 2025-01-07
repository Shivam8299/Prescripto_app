import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

function Contact() {
  return (
      <div>
        <div className='text-center text-2xl pt-10 text-gray-500'>
          <p className='text-3xl p-12 text-bold'>CONTACT <span className='text-gray-700 font-medium'>US</span></p>
        </div>
        <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm lg:text-base'>
          <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
          <div className='flex flex-col justify-center items-start gap-6'>
            <p className='font-semi-bold text-lg text-gray-600'>OUR OFFICE</p>

            <p className='text-gray-500' >54709 Willms Station <br/> Suite 350, Washington, USA</p>
 
            <p className='text-gray-500' >Tel: (415) 555‑0132 <br /> Email: greatstackdev@gmail.com </p>
 
            <b className='font-semi-bold text-lg text-gray-600'>Careers at PRESCRIPTO</b>

            <p className='text-gray-500'>Learn more about our teams and job openings.</p>

            <button className='px-8 text-sm py-4 border border-black hover:bg-black hover:text-white transition-all duration-500 text-gray-600 cursor-pointer'> Explore Jobs</button>
          </div>
        </div>
      </div>
  )
}

export default Contact
