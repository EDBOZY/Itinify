import { GetPlaceDetails } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const PHOTO_URL='https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY


function PlaceCardItem({dataa,loc}) {
    const[phtourl,Setphotourl]=useState();
    useEffect(()=>{
        dataa&&GetPlacePhoto();
    },[dataa])
    const GetPlacePhoto=async()=>{
        const data={
            textQuery:dataa.place
        }
        const result=await GetPlaceDetails(data).then(resp=>{
            console.log(resp.data)
            const photourl=PHOTO_URL.replace('{NAME}',resp.data.places[0].photos[3].name)
            Setphotourl(photourl)
        })
    }
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' +dataa.place+","+loc} style={{textDecoration:"none"}} target='_blank' >
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all cursor pointer'>
        <img src={phtourl} alt=""  className='w-[130px] h-[130px] rounded-xl object-cover' />
        <div>
            <h2 className='font-bold text-lg   text-black '>{dataa.place}</h2>
            <p className='text-sm text-gray-400'>{dataa.details}</p>
            <h2 className=' text-black'>{dataa.time}</h2>
            <h2 className='mt-2  text-gray-400 text-sm'>{dataa.ticket_pricing}</h2>
        </div>
    </div>
    </Link>
  )
}

export default PlaceCardItem