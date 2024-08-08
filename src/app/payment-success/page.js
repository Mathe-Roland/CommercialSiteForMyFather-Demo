import React from 'react';

import { nonRegisteredUserData,deleteNonRegisteredUserProduct } from '../components/asyncOperations/fetchData';


const newDatas=async()=>{

  const panouForSpecificUser=await nonRegisteredUserData();

  const UUIDS=localStorage.getItem("userUUID");

  const panouForNonRegisteredUser=panouForSpecificUser.data.filter((e)=>e.attributes.UniqueIdentifier===UUIDS);

   await Promise.all(panouForNonRegisteredUser.map(async (element) => {
     await deleteNonRegisteredUserProduct(element.id);
  }));



} 

export default function PaymentSuccess(){

 
  newDatas();


  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
        <h2 className="text-2xl">You successfully sent</h2>
      </div>
    </main>
  );
}
