import React from 'react'
import "./AsideBar.css";
import asideConstants from '../constants/asideConstants';
export default function AsideBar() {
  return (
    <div className='bg-white flex flex-col items-center justify-start p-2' id='aside-bar'>
        {asideConstants.map((constant,i)=>(
            <div key={i} className='flex flex-wrap flex-col my-4'>
                <h6 className='font-medium underline'>{constant.heading}</h6>
                {constant.values.map((value,i)=>(
                    <li key={i} className='text-slate-500'>{value}</li>
                ))}
            </div>
        ))}
    </div>
  )
}
