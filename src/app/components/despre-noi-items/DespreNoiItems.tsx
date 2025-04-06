"use client";

import { usePathname } from "next/navigation";
import { useState,useEffect } from "react";
import { fetchCategory } from "../asyncOperations/fetch-by-id/fetchBYId"; 
import CustomizedAccordions from "../accordion/Accordion";
import ProdusCard from "../card-produse/ProdusCard";
import "./DespreNoiItems.css";


const DespreNoiItems=()=>{

    const params=usePathname();
    let newParam=params.split("-");
    let header=`${newParam[0][1].toUpperCase()}${newParam.join(" ").slice(2)}`;
    const [cardList,setCardList]=useState([]);

    useEffect(()=>{

        const param=async ()=>{
            let category=header.toLowerCase();

            const data=await fetchCategory(category);
            
            setCardList(data);

        }

        param();

    },[])

    return (
        <div className="despre-noi-items-box">
                <div className="accordionplushd">

                    <div className="accordion-container">

                    <CustomizedAccordions/>

                    </div>
                    
                    <div className="headerplusdescription">
                    <h1 className="header">{header}</h1>

                    </div>

                </div>
                <div className="cardList-container">
                    {cardList.length>0?
                    (cardList.map(e=>(
                        <ProdusCard
                            key={e?.id}
                            id={e?.id}
                            description={e.attributes.description ? e?.attributes?.description : "" }
                            title={e.attributes.title ? e?.attributes?.title : "Placeholder title"}
                            image={e.attributes.image.data ? e?.attributes?.image?.data[0]?.attributes?.url : ""}
                            disponibil={"Este disponibil"}
                            price={e.attributes.price ? e?.attributes?.price : "An error occured,there is no price momentarily"}
                        />)
                    ))
                    :null}
                </div>

        </div>

    )

}

export default DespreNoiItems;