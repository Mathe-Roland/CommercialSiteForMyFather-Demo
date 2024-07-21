"use client";

import { usePathname } from "next/navigation";
import { useState,useEffect } from "react";
import { fetchCategory } from "../components/asyncOperations/fetchData";
import CustomizedAccordions from "../components/accordion/Accordion";
import "./Cadouri.css";
import ProdusCard from "../components/card-produse/ProdusCard";

const Cadouri=()=>{

    const params=usePathname();
    let newParam=params.split("-");
    let header=`${newParam[0][1].toUpperCase()}${newParam.join(" ").slice(2)}`;
    const [cardList,setCardList]=useState([]);

    useEffect(()=>{

        const param=async ()=>{
            let category=header.toLowerCase();

            const data=await fetchCategory(category);
            
            setCardList(data);
            console.log(data);
            // setCardList(data);


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


                    <p>Descriere despre cadouri</p>


                    </div>
                    



                </div>
                <div className="cardList-container">
                    {cardList.length>0?
                    (<ProdusCard
                        description={cardList[0].attributes.description}
                        title={cardList[0].attributes.title}
                        image={cardList[0].attributes.image.data.attributes.url}
                        disponibil={"Nu este disponibil"}
                        price={cardList[0].attributes.price}
                    />)
                    :null}
                </div>

        </div>

    )

}

export default Cadouri;