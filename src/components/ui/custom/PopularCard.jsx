import { GetPlaceDetails } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const PHOTO_URL='https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY


function PopularCard({item}) {
    const[phtourl,Setphotourl]=useState();
    useEffect(()=>{
        item&&GetPlacePhoto();
    },[item])
    const GetPlacePhoto=async()=>{
        const data={
            textQuery:item.Place+" "+item.Country
        }
        const result=await GetPlaceDetails(data).then(resp=>{
            console.log(resp.data)
            const photourl=PHOTO_URL.replace('{NAME}',resp.data.places[0].photos[3].name)
            Setphotourl(photourl)
        })
    }
  return (
    <Link 
        to={'https://www.google.com/maps/search/?api=1&query=' + item.Place + "," + item.Country} 
        style={{ textDecoration: "none" }} 
        target="_blank"
    >
        <div 
        className="hover:scale-105 transition-all rounded-xl h-[380px] w-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(${phtourl})` }}
        >
        <div className="absolute inset-0 bg-black bg-opacity-30 rounded-xl"></div> {/* Optional dark overlay */}
        <div className="absolute bottom-2 left-2 text-white p-2">
            <h2 className="font-medium">{item.Place}</h2>
            <h2 className="text-xs text-gray-300">{item.Country}</h2>
        </div>
        </div>
    </Link>
  
  )
}

export default PopularCard