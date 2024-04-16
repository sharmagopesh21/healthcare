import React,{useState} from 'react'
import { Link } from "react-router-dom";
import CurrentInsurance from './currentInsurance';
import ApplyInsurance from './applyInsurance';
import ScheduleAppointment from './scheduleAppointment';

const user = () => {
  return (
    <div className='w-full h-screen'>
        <div className='flex items-center justify-between'>
            <p>User</p>
            <Link to={"/login"}>LOG OUT</Link>
        </div>
        <div className=' flex requests w-full h-1/2 mb-3'>
          <div>
            <p className='text-black w-full h-full bg-blue-800 m-5'>Schedule Appointment
            <ScheduleAppointment />
            </p>
          </div>
            <p className='text-black w-full h-full bg-blue-800 m-5'>Chat with AI</p>
        </div>
        <div>
          <p className='text-black w-full h-[350px] bg-blue-800 m-5 mt-3'>Current Insurance
          <CurrentInsurance />
          </p>
        </div>
        <div>
        <p className='text-black w-full h-[350px] bg-blue-800 m-5 mt-3'>Apply Insurance
        <ApplyInsurance />
        </p>
        </div>
    </div>
  )
}

export default user