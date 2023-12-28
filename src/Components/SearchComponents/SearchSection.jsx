import React from 'react'
import "./SearchSection.css";
import { useParams } from 'react-router-dom';
export default function SearchSection() {
    const {searchQuery} = useParams();
  return (
    <div id='search-section' className='flex flex-col items-center justify-start'>
      <div>
        <h4 className='text-white font-medium text-2xl'>Obtaining Search results for : "{searchQuery}"</h4>
      </div>
    </div>
  )
}
