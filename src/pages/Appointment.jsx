import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

function Appointment() {
  const {docId} = useParams()
  const {doctors} = useContext(AppContext)
  const [docInfo, setDocInfo] = useState(null)

  const fetchDocInfo = async ()=> {
    const foundDoc = doctors.find(doc => doc._id === docId)
      setDocInfo(foundDoc)
      console.log(foundDoc)
  }

  useEffect(()=>{
    fetchDocInfo() 
  },[doctors,docId])
  return (
    <div>
      {/* doctor's details  */}
      <div>
        <div>
          {docInfo.name}
        </div>
      </div>
    </div>
  )
}

export default Appointment
