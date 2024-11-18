import { GetPlaceDetails } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const PHOTO_URL='https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY


function HotelCardItem({item}) {
    const[phtourl,Setphotourl]=useState();
    useEffect(()=>{
        item&&GetPlacePhoto();
    },[item])
    const GetPlacePhoto=async()=>{
        const data={
            textQuery:item.name
        }
        const result=await GetPlaceDetails(data).then(resp=>{
            console.log(resp.data)
            const photourl=PHOTO_URL.replace('{NAME}',resp.data.places[0].photos[3].name)
            Setphotourl(photourl)
        })
    }
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' +item.name+","+item.address} style={{textDecoration:"none"}} target='_blank' >
                    <div className='hover:scale-105 transition-all'>
                        <img src={phtourl} alt="" className='rounded-xl h-[180px] w-full object-cover' />
                        <div className='my-2 flex flex-col gap-2'>
                            <h2 className='font-medium text-black'>{item.name}</h2>
                            <h2 className='text-xs text-gray-500'>{item.address}</h2>
                            <h2 className='text-sm  text-black'>{item.price}</h2>
                            <h2 className='text-sm  text-black'>{item.rating}</h2>
                        </div>
                    </div>
                </Link>
  )
}

export default HotelCardItem