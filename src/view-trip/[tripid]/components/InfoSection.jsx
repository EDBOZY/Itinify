import { GetPlaceDetails } from '@/service/GlobalApi'
import React, { useEffect, useState } from 'react'

const PHOTO_URL='https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY

function InfoSection({trip}) {
    const[phtourl,Setphotourl]=useState();
    useEffect(()=>{
        trip&&GetPlacePhoto();
    },[trip])
    const GetPlacePhoto=async()=>{
        const data={
            textQuery:trip?.userSelection?.location?.label
        }
        const result=await GetPlaceDetails(data).then(resp=>{
            console.log(resp.data)
            const photourl=PHOTO_URL.replace('{NAME}',resp.data.places[0].photos[3].name)
            Setphotourl(photourl)
        })
    }
  return (
    <div>
        <img src={phtourl} alt="" className='h-[340px] w-full object-cover rounded-xl ' />
        <div className='my-5 flex flex-col gap-2'>
            <h2 className='font-bold text-2xl '>{trip?.userSelection?.location?.label}</h2>
            <div className='flex gap-5'>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>{trip?.userSelection?.noofdays} Day</h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>{trip?.userSelection?.budget} Day</h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>{trip?.userSelection?.travellet} Day</h2>

            </div>
        </div>
    </div>
  )
}

export default InfoSection