"use client";

import { usePathname } from "next/navigation";
import { useState,useEffect } from "react";
import { fetchCategory } from "../components/asyncOperations/fetchData";
import CustomizedAccordions from "../components/accordion/Accordion";
import ProdusCard from "../components/card-produse/ProdusCard";
import "../cadouri/Cadouri.css";


const CadouriPersonalizate=()=>{

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
        <div className="Cadouri-box">
                <div className="accordionplushd">

                    <div className="accordion-container">

                    <CustomizedAccordions/>

                    </div>
                    
                    <div className="headerplusdescription">
                    <h1 className="header">{header}</h1>


                    <p>Cadouri personalizate </p>


                    </div>

                </div>
                <div className="cardList-container">
                    {cardList.length>0?
                    (cardList.map(e=>(
                        <ProdusCard
                            key={e.id}
                            description={e.attributes.description}
                            title={e.attributes.title}
                            image={e.attributes.image.data.attributes.url}
                            disponibil={"Este disponibil"}
                            price={e.attributes.price}
                        />)
                    ))
                    :null}
                </div>

        </div>

    )

}

export default CadouriPersonalizate;