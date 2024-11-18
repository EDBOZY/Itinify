import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({trip}) {
  return (
    <div>
        <h2 className='font-bold text-lg'>Places to Visit</h2>
        <div>
            {trip?.tripData?.itinerary &&
                Object.entries(trip.tripData.itinerary).map(([day, times], dayIndex) => (
                <div key={dayIndex} className="">
                    <h2 className='font-medium text-lg'>{day}</h2>
                    <div className='grid md:grid-cols-2 gap-5'>
                    {Object.entries(times).map(([timeOfDay, activity], timeIndex) => (
                    <div key={timeIndex} className="my-3">
                        <h2 className='font-medium text-sm text-orange-500'>{timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)}</h2>
                        {/* {activity.place} */}
                        <PlaceCardItem dataa={activity} loc={trip?.userSelection?.location?.label}/>
                        {/* <p>{activity.details || "No activity planned"}</p> */}
                        {/* Display more details of `activity` here if needed */}
                    </div>
                    ))}
                    </div>
                </div>
                ))
            }
        </div>
    </div>
    
  )
}

export default PlacesToVisit