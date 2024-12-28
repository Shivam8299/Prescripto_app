import React, { useState } from 'react';
import { assets } from '../assets/assets_frontend/assets'; // Verify this path!

function MyProfile() {
  const [userData, setUserData] = useState({
    name: 'Arav',
    image: assets.profile_pic, // Ensure this is correctly exported
    email: 'arav123@email.com',
    phone: '91 9452343542',
    address: {
      line1: 'Sector 53, Richmond',
      line2: 'Goal Cauraha, Indra Nagar'
    },
    gender: 'Male',
    dob: '2000-01-29',
  });

  return (
    <div>
      <h2>{userData.name}'s Profile</h2>
      <img src={userData.image} alt={`${userData.name}'s profile`} />
      <p>Email: {userData.email}</p>
      <p>Phone: {userData.phone}</p>
      <p>Address: {userData.address.line1}, {userData.address.line2}</p>
      <p>Gender: {userData.gender}</p>
      <p>Date of Birth: {userData.dob}</p>
    </div>
  );
}

export default MyProfile;
