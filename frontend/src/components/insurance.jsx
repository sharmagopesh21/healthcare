import React from 'react'
import { Link } from "react-router-dom";

const Insurance = () => {
  return (
    <div className='w-full h-screen bg-gray-100'>
        <div className='flex items-center justify-between p-5 bg-white shadow-md'>
            <p className='text-2xl font-bold'>Company</p>
            <Link className='text-blue-500 hover:text-blue-700' to={"/"}>LOG OUT</Link>
        </div>
        <div className='requests w-full h-1/3 bg-blue-800 m-5 rounded-lg shadow-md p-3'>
            <p className='text-white text-xl'>Claim Requests</p>
        </div>
        <div className='requests w-full h-1/3 bg-blue-800 m-5 rounded-lg shadow-md p-3'>
            <p className='text-white text-xl'>Apply Requests</p>
        </div>
        <div className='requests w-full h-1/3 bg-blue-800 m-5 rounded-lg shadow-md p-3'>
            <p className='text-white text-xl'>Users</p>
        </div>
    </div>
  )
}

export default Insurance;
