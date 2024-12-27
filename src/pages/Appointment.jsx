import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets';
import ReletedDoctors from '../components/ReletedDoctors';

function Appointment() {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);

  const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null); // Track selected time slot

  // Fetch doctor information
  useEffect(() => {
    if (doctors.length > 0) {
      const foundDoc = doctors.find(doc => doc._id === docId);
      setDocInfo(foundDoc || null);
    }
  }, [doctors, docId]);

  // Generate available slots
  useEffect(() => {
    if (!docInfo) return;
    const generateSlots = () => {
      const slots = [];
      const today = new Date();

      for (let i = 0; i < 7; i++) {
        const currentDate = new Date();
        currentDate.setDate(today.getDate() + i);

        const endTime = new Date(currentDate);
        endTime.setHours(21, 0, 0, 0);

        if (i === 0) {
          currentDate.setHours(Math.max(currentDate.getHours(), 10));
          currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
        } else {
          currentDate.setHours(10, 0, 0, 0);
        }

        const timeSlot = [];

        while (currentDate < endTime) {
          timeSlot.push({
            datetime: new Date(currentDate),
            time: currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          });
          currentDate.setMinutes(currentDate.getMinutes() + 30);
        }
        slots.push(timeSlot);
      }

      setDocSlots(slots);
    };

    generateSlots();
  }, [docInfo]);

  return docInfo && (
    <div className=''>
      {/* doctor's details */}
      <div className='sm:flex flelx-col sm:flex-row gap-4'>
        <div>
          <img className='w-full h-84 sm:h-96 bg-primary sm:max-w-72 sm:rounded-lg' src={docInfo.image} alt="" />
        </div>
        <div className='w-full sm:flex-1 border border-gray-400 h-84 sm:rounded-lg p-8 py-7 bg-white sm:mx-0 mt-2 sm:mt-0'>
          {/* docInfo name speciality degree experience */}
          <p className='flex items-center gap-2 text-2xl lg:text-3xl font-medium text-gray-900'>{docInfo.name} <img className='w-5' src={assets.verified_icon} alt="" /></p>
          <div className='flex flex-center gap-2 text-sm lg:text-lg mt-1 lg:mt-2 text-gray-600'>
            <p>{docInfo.degree}- {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full lg:text-md'>{docInfo.experience}</button>
          </div>
          {/* about doctor */}
          <div>
            <p className='flex items-center gap-1 text-sm lg:text-lg font-medium text-gray-900 mt-3'>
              Apout <img src={assets.info_icon} alt="" />
            </p>
            <p className='text-sm lg:text-lg text-gray-500 lg:text-gray-600 max-w-[700px] mt-1'> {docInfo.about}</p>
          </div>
          <p className='text-gray-500 font-medium lg:font-semibold mt-4 '> Appointment fee <span className='text-gray-600 hover:text-black hover:cursor-pointer '>{currencySymbol}{docInfo.fees}</span></p>
        </div>
      </div>

      {/* +++++++++++++++++BOOKING SLOT ++++++++++*/}

      <div className='sm:ml-72 sm-pl-4 font-medium text-gray-700'>
        <p>Booking slots</p>
        <div className='flex gap-3 items-center w-full over-x-scroll mt-4'>
          {docSlots.length && docSlots.map((item, index) => (
            <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? "bg-primary text-white" : 'border border-gray-200'}`} key={index}>
              <p>{item[0] && week[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDay()}</p>
            </div>
          ))}
        </div>

        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {docSlots.length && docSlots[slotIndex].map((item, index) => (
            <p 
              onClick={() => setSelectedTime(item.time)} // Set selected time on click
              className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === selectedTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`} 
              key={index}
            >
               {item.time.toLowerCase() > '12' ? `${item.time.toLowerCase() } pm` : `${item.time.toLowerCase() } am`} 
            </p>
          ))}
        </div>
        <button className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'> Book an appointment</button>
      </div>
      {/* listing doctor releted part */}
      <ReletedDoctors docId = {docId} speciality = {docInfo.speciality} />
    </div>
  );
}

export default Appointment;
