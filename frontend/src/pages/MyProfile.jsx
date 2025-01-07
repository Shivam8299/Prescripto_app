import React, { useState } from 'react';
import { assets } from '../assets/assets_frontend/assets'; // Verify this path!

function MyProfile() {
  const [userData, setUserData] = useState({
    name: 'Shivam Mishra',
    image: assets.profile_pic, // Ensure this is correctly exported
    email: 'arav123@email.com',
    phone: '+919452343542',
    address: {
      line1: 'Sector 53, Richmond',
      line2: 'Goal Cauraha, Indra Nagar'
    },
    gender: 'Male',
    dob: '2000-01-29',
  });

  const [isEdit, setIsEdit] = useState('false')

  return (
    <div className='mx-w-lg flex-col gap-2 text-sm'>
      <img className='w-36 rounded' src={userData.image}/>
      {
        isEdit
          ? <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4 mb-4' type="text" value={userData.name} onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} />
          : <p className='font-medium text-3xl text-neutral-800 mt-4 mb-4'>{userData.name}</p>
      }
      <hr  className='bg-zinc-400 h-[1px] border-none'/>
      <div>
        <p className='text-neutral-500 underline mt-4 mb-3'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 text-neutral-700'>
          <p className='font-medium'>Email:</p>
          <p className='text-blue-500'>{userData.email}</p>
          <p className='font-medium'>Phone:</p>
          {
            isEdit
              ? <input className='bg-gray-100 max-w-52' type="text" value={userData.phone} onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
              : <p className='text-blue-500'>{userData.phone}</p>
          }
          <p className='font-medium'>Address:</p>
          {
            isEdit
              ? <p>
                <input className='bg-gray-50' type="text" value={userData.address.line1} onChange={e => setUserData(prev => ({ ...prev.address, line1: e.target.value }))} />
                <br />
                <input className='bg-gray-50' type="text" value={userData.address.line2} onChange={e => setUserData(prev => ({ ...prev.address, line2: e.target.value }))} />
              </p>
              : <p className='text-gray-500'>
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
          }
        </div>
      </div>
      <div>
        <p className='text-neutral-500 underline mt-3 mb-3'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 text-neutral-700'>
          <p className='font-medium'>Gender:</p>
          {
            isEdit
              ? <select className='max-w-20 bg-gray-100' onChange={e => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              :<p className='text-gray-400'>{userData.gender}</p>
          }
          <p className='font-medium'>Birthday:</p>
          {
            isEdit 
            ? <input className='max-w-28 bg-gray-100' type='date' value={userData.dob} onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))} />
            : <p className='text-gray-400'>{userData.dob}</p>
          }
        </div>
      </div>
      <div className='mt-10'>
        {
          isEdit 
          ? <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white translate-all ' onClick={()=>setIsEdit(false)}>Save Information</button>
          : <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white translate-all ' onClick={()=>setIsEdit(true)}>Edit</button>
        }
      </div>
    </div>
  );
}

export default MyProfile;
