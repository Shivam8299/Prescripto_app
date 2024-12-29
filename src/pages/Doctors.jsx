import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Added useNavigate
import { AppContext } from '../context/AppContext';
import { doctors as allDoctors } from '../assets/assets_frontend/assets'; // Renamed import to avoid conflict

function Doctors() {
  const { speciality } = useParams();
  const navigate = useNavigate(); // Added navigate
  const { Doctors: contextDoctors } = useContext(AppContext); // Renamed to avoid conflict

  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false)

  useEffect(() => {
    if (speciality) {
      setFilterDoc(allDoctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(contextDoctors || allDoctors);
    }
  }, [speciality, contextDoctors]);

  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialists</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
      <button className={`py-1 px-3 border rounded text-sm translate-all sm:hidden ${showFilter ?'bg-primary text-white' :''}`} onClick={()=>setShowFilter(pre => !pre)}>Filters</button>

                                                                          {/* Static list of specialities */}

        <div className={`flex-col gap-4 text-sm text-gray-600 hover:text-gray-800 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>

          <p onClick={()=>speciality === 'General physician' ? navigate('/doctors'): navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded translate-all cursor-pointer ${speciality === "General physician" ? "bg-indigo-100 text-black":""}`}>General physician</p>
          <p onClick={()=>speciality === 'Gynecologist' ? navigate('/doctors'): navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded translate-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-black":""}`}>Gynecologist</p>
          <p onClick={()=>speciality === 'Dermatologist' ? navigate('/doctors'): navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded translate-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-black":""}`}>Dermatologist</p>
          <p onClick={()=>speciality === 'Pediatricians' ? navigate('/doctors'): navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded translate-all cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-100 text-black":""}`}>Pediatricians</p>
          <p onClick={()=>speciality === 'Neurologist' ? navigate('/doctors'): navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded translate-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text-black":""}`}>Neurologist</p>
          <p onClick={()=>speciality === 'Gastroenterologist' ? navigate('/doctors'): navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded translate-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black":""}`}>Gastroenterologist</p>
        </div>

        {/* Doctors cards */}

        <div className='w-full grid grid-cols-auto gap-5 pay-y-6 mt-4'>
          {filterDoc.map((item, index) => (
            <div
              key={item._id || index} // Use unique key if available
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
            >
              <img className="bg-blue-50" src={item.image} alt={item.name} />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  <p>Available</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Doctors;
