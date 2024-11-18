import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AIPrompt, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import { chatSession } from '@/service/AiModel';
import { CloudFog } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { useNavigate } from 'react-router-dom';
  

function CreateTrip() {
    const[place,setPlace]=useState();
    const[loading,SetLoading]=useState(false);
    const[formData,SetFormData]=useState([]);
    const [openDialog,SetOpenDailog]=useState(false);
    const router=useNavigate()
    const handleInputChange=(name,value)=>{
        SetFormData({
            ...formData,
            [name]:value
       
        })
    }
    useEffect(()=>{
        // console.log(formData)
    },[formData])

    const login=useGoogleLogin({
        onSuccess:(codeResp)=>GetUserProfile(codeResp),
        onError:(error)=>console.log(error),    
    })

    const GetUserProfile=(tokeninfo)=>{
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokeninfo.access_token}`,{
            headers:{
                Authorization:`Bearer ${tokeninfo.access_token}`,
                Accept:'Application/json'
            }
        }).then((resp)=>{
            console.log(resp)
            localStorage.setItem('user',JSON.stringify(resp.data));
            SetOpenDailog(false);
            OnGenerateTrip();
        })
    }

    const OnGenerateTrip=async()=>{

        const user=localStorage.getItem('user');
        if(!user){
            SetOpenDailog(true);
            return;
        }

        if(formData.noofdays>5 && !formData.traveller||!formData.budget||!formData.location){
            toast("should be less than 5 days and fill up all details")
            return;
        }
        SetLoading(true);
        const FINAL_Propmt=AIPrompt
        .replace('{location}',formData.location.label)
        .replace('{totalDays}',formData.noofdays)
        .replace('{traveler}',formData.traveller)
        .replace('{budget}',formData.budget)
        .replace('{totaldays}',formData.noofdays)
        // console.log(FINAL_Propmt)
        const result=await chatSession.sendMessage(FINAL_Propmt);
        console.log(result.response.text())
        SaveAiTrip(result.response.text())
        SetLoading(false);

    }
    const SaveAiTrip=async(TripData)=>{
        SetLoading(true);
        const user=JSON.parse(localStorage.getItem('user'));
        const docid=Date.now().toString()
        await setDoc(doc(db,"AITrips",docid),{
            userSelection:formData,
            tripData:JSON.parse(TripData),
            userEmail:user.email,
            id:docid,
        });
        SetLoading(false);
        router('/view-trip/'+docid)

    }
  return (
    <div className='sm:px-10 nd:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
        <h2 className='font-bold text-3xl'>Tell us your travel preferences</h2>
        <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information,ans out trip planner will generate a customized itinerary based on your preferences.</p>

        <div className='mt-20 flex flex-col gap-10'>
            <div>
                <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
                <GooglePlacesAutocomplete 
                    apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                    selectProps={{
                        place,
                        onChange:(v)=>{setPlace(v),handleInputChange('location',v)}
                    }}
                />
            </div>
            <div>
                <h2 className='text-xl my-3 font-medium'>How many days are you staying?</h2>
                <Input onChange={(e)=>handleInputChange('noofdays',e.target.value)} placeholder={'Ex.3'} type="number"/>
            </div>
            <div>
                <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
                <div className='grid grid-cols-3 gap-5 mt-5'>
                    {SelectBudgetOptions.map((item,index)=>(
                        <div key={index} onClick={()=>handleInputChange('budget',item.title)} className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${formData.budget==item.title?'border-red-500 border-2':''}`}>
                            <h2 className='text-4xl'>{item.icon}</h2>
                            <h2 className='font-bold text-lg'>{item.title}</h2>
                            <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h2 className='text-xl my-3 font-medium'>Number of People?</h2>
                <div className='grid grid-cols-2 gap-10 mt-5 lg:flex lg:items-center lg:justify-center lg:gap-10'>
                {SelectTravelesList.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleInputChange('traveller', item.people)}
                        className={`relative flex items-center justify-center rounded-full overflow-hidden cursor-pointer h-[200px]  transition-all transform hover:scale-105
                        ${formData.traveller === item.people ? 'border-4 border-red-500 shadow-lg' : 'border border-gray-300 shadow-md'}
                        `}
                        style={{
                        backgroundImage: `url(${item.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: '150%',
                        maxWidth: '200px', // max width for larger screens
                        aspectRatio: '1',  // keeps it a square that scales well on different devices
                        }}
                    >
                        {/* Overlay for text readability */}
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 rounded-full">
                        <div className="text-center text-white">
                            <h2 className="font-semibold text-base md:text-lg lg:text-xl">{item.title}</h2>
                            <p className="text-xs md:text-sm text-gray-200 mt-1">{item.desc}</p>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
        <div className='my-10 flex justify-end'>
            <Button disabled={loading} onClick={OnGenerateTrip}>{loading?"waiting":"Generate Trip"}</Button>
        </div>
        <Dialog open={openDialog}>
            <DialogContent>
                <DialogHeader>
                <DialogDescription>
                    <img src="/logo.svg" alt="" />
                    <h2 className='font-bold text-lg mt-7'>Sign In with Google</h2>
                    <p>Sign in to the App with Google authenthication security</p>
                    <Button  onClick={login} className="w-full mt-5">Sign in with Google</Button>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    </div>
  )
}

export default CreateTrip