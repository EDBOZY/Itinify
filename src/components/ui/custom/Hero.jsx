import React from 'react'
import { Button } from '../button'
import { Link } from 'react-router-dom'
import Popular from './Popular'
import Footer from '@/view-trip/[tripid]/components/Footer'

function Hero() {
  return (
    // <div className='flex flex-col items-center mx-60 gap-9'>
    //     <h1 className='font-extrabold text-[50px] text-center mt-16 '>
    //         <span className='text-[#f56551]'>Discover Your Next Adventure with AI:<br/></span>
    //         Personalized Itineraries at Your FingerTips
    //     </h1>
    //     <p className='text-xl text-gray-500 text-center'> Your personal trip planner and travel curator,creating custom itienraries tailored to you interests and budget</p>
    //     <Link to={'/create-trip'}>
    //         <Button>Get Started,Its free</Button>
    //     </Link>
    // </div>
    <div className='flex flex-col'>
    <div className="flex flex-col items-center lg:flex-row lg:mx-40 lg:gap-10 sm:mx-5 sm:gap-5 justify-center">
      <div className="flex flex-col gap-5 text-center lg:text-left lg:items-start items-center">
        <h1 className="font-extrabold text-[50px] sm:text-[30px] mt-10 lg:mt-16 lg:text-[50px]">
          Start your journey by one click, explore the beautiful world!
        </h1>
        <p className="text-lg text-gray-500 sm:text-base lg:text-lg">
          Plan and book your perfect trip with expert advice, travel tips, destination information, and inspiration from us!
        </p>
        <Link to={'/create-trip'}>
          <Button className='bg-[#FA8443]'>Get Started,Its free</Button>
        </Link>
      </div>
      <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
        <img
          className="h-[300px] w-[400px] md:h-[480px] md:w-[720px] lg:h-[640px] lg:w-[950px]"
          src="/illus.png"
          alt="Illustration of travel destinations"
        />
      </div>
    </div>
    <Popular/>
    <Footer/>
    </div>



    

  )
}

export default Hero