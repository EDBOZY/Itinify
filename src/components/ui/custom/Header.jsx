// import React, { useEffect } from 'react'
// import { Button } from '../button'
// import { googleLogout } from '@react-oauth/google';
// import { NavLink, useNavigate } from 'react-router-dom';

// function Header() {
//   const users=JSON.parse(localStorage.getItem('user'));
//   useEffect(()=>{
//     console.log(users)
//   })
//   const navigate=useNavigate();

//   return (
//     <div className='p-3 shadow-sm flex justify-between items-center px-5 '>
//       <img src="/logo.svg" alt="" />
//       <div>
//         {users?<Button onClick={()=>{
//           googleLogout();
//           localStorage.clear();
//           navigate("/");
//         }}>Logout</Button>:<Button>Sign In</Button>}
//       </div>
//     </div>
//   )
// }

// export default Header

import React, { useEffect, useState } from 'react';
import { Button } from '../button';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import axios from 'axios';
function Header() {
  const users = JSON.parse(localStorage.getItem('user')); // Safely parse user data

  useEffect(() => {
    console.log(users);
  }, []); // Add dependency array to run only once

  const handleLogout = () => {
    googleLogout();           // Log out the user
    localStorage.clear();      // Clear local storage
    window.location.href = '/';
  };

  const [openDialog,SetOpenDailog]=useState(false);

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
    })
}

  

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <img src="/Itinify.png" alt="Logo" onClick={()=>{window.location.href = '/'} } className ="cursor-pointer"/>
      <div>
        {users ? (
          <Button className='bg-[#FA8443] p-5' onClick={handleLogout}>Logout</Button>
        ) : (
          <Button className='bg-[#FA8443] p-5' onClick={()=>SetOpenDailog(true)} >Sign In</Button>
        )}
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
    
  );
}

export default Header;
