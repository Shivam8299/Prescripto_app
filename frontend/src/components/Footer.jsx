import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

function Footer() {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        {/* +++++++++++++left +++++++++++++++ */}
        <div>
          <img className='mb-5 w-40' src={assets.logo} alt="" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis expedita mollitia neque? Provident quasi, maxime mollitia vel excepturi nostrum molestiae animi voluptatem. Maxime molestias voluptas saepe pariatur consequuntur sequi sed?</p>
        </div>
         {/* +++++++++++++Center +++++++++++++++ */}
         <div>
            <p className='text-xl font-medium mb-5'>Company</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
              <li>Home</li>
              <li>About</li>
              <li>Contact Us</li>
              <li>Privacy & Policy</li>
            </ul>
          </div>
           {/* +++++++++++++Right+++++++++++++++ */}

        <div >
         <p className='text-xl font-medium mb-5'>Get in Touch</p> 
         <ul className='flex flex-col gap-2 text-gray-600'>
          <li>+91 8299726228 </li>
          <li>shivam@gmail.com</li>
         </ul>
        </div>
      </div>
      {/* ++++++++++++++++copyright text+++++++++++++  */}
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright Prescipto@ 2024 - All Right are reserved </p>
      </div>
    </div>
  )
}

export default Footer
