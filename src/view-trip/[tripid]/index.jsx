import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import InfoSection from './components/InfoSection';
import Hotels from './components/Hotels';
import PlacesToVisit from './components/PlacesToVisit';
import Footer from './components/footer';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from '@/components/ui/button';

function Viewtrip() {
    const {tripId}=useParams();
    const[trip,SetTrip]=useState([])
    useEffect(()=>{
        tripId&&GetTripData();
    },[tripId])
    const GetTripData=async()=>{
        const docRef=doc(db,'AITrips',tripId);
        const docSnap=await getDoc(docRef);

        if(docSnap.exists){
            console.log("document:",docSnap.data());
            SetTrip(docSnap.data())
        }
        else{
            console.log("not found");
            toast("no value found")
        }
    }


    const generatePDF = async () => {
        const content = document.getElementById('trip-content');
        
        // Capture the content as a canvas
        const canvas = await html2canvas(content, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        
        // Set up PDF dimensions
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        // Add the image to the PDF and save it
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('trip-details.pdf');
    };


  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
            

            {/* Content to be included in the PDF */}
            <div id="trip-content">
                {/* Information Section */}
                <InfoSection trip={trip} />
                
                {/* Recommended Hotels Section */}
                <Hotels trip={trip} />
                
                {/* Daily Plan or Places to Visit Section */}
                <PlacesToVisit trip={trip} />
                
                
            </div>
            {/* Button to download the PDF */}
            <Button onClick={generatePDF} className="mb-4 p-2 bg-blue-500 text-white rounded justify-end flex">
                Download as PDF
            </Button>
            {/* Footer Section */}
            <Footer />
        </div>
  )
}

export default Viewtrip