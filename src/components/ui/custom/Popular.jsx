import { PopularDestinations } from '@/constants/options'
import HotelCardItem from '@/view-trip/[tripid]/components/HotelCardItem'
import React, { useEffect, useState } from 'react'
import PopularCard from './PopularCard'

function Popular() {
    
  return (
    <div className='p-10 gap-5 flex flex-col '>
        <h1 className='font-bold text-[30px] mt-5'>Popular Destinations</h1>
        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
            {PopularDestinations.map((item,index)=>(
                <PopularCard item={item}/>
            ))}
        </div>
    </div>
  )
}

export default Popular