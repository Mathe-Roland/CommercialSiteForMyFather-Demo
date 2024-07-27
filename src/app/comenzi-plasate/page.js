
"use client";

import OrderCard from "../components/orderCard/OrderCard";
import "./ComenziPlasate.css";
import { useEffect,useState } from "react";
import { comenziPlasateUserData } from "../components/asyncOperations/fetchData";

const ComenziPlasate=()=>{

    const [comenziPlasate,setComenziPlasate]=useState([]);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        const getData=async ()=>{
          const data =await comenziPlasateUserData();
          if(data===null){

            return <div>Is Loading...</div>
        }
          setComenziPlasate(data.data)
        }
        getData();

    },[])



    return (<div className="comenzi-plasate-container">
        <div className="comenzi-plasate-header">
            <h2>Comenzi plasate</h2>

        </div>
        {
        comenziPlasate?.map((element)=>(
            <OrderCard 
            key={element.id}
            order={element}/>
        ))}
    </div>)
}


export default ComenziPlasate;
