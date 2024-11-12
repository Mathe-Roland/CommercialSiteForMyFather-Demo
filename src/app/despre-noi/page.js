"use client";

import "./DespreNoi.css";
import { useState, useEffect } from "react";
import ImageGallery from "../components/imageGallery/ImageGallery";
import { fetchDataDespreNoiPage } from "../components/asyncOperations/fetchData";
import CustomizedAccordions from "../components/accordion/Accordion";

const DespreNoiReal = () => {
    const [imageGalleryPictures, setImageGalleryPictures] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            const data = await fetchDataDespreNoiPage();
            setImageGalleryPictures(data.data.data);
        };
        
        fetchData();

    }, []);

    useEffect(()=>{
        if(document.title){
        
            let title = "Despre noi";
    
            let description = `Descoperă povestea noastră și valorile care ne ghidează! Suntem o echipă dedicată, pasionată de 
            crea produse personalizate pentru utilizatori, cu ani de experiență în oferirea de produse personalizate din mdf si lemn. Află mai multe despre misiunea noastră,
             angajamentul față de clienți și de ce suntem alegerea potrivită pentru tine. Vino să ne cunoști!`;
    
            document.title = title;
    
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
              metaDescription.setAttribute("content", description);
            } else {
              const meta = document.createElement("meta");
              meta.name = "description";
              meta.content = description;
              document.head.appendChild(meta);
            }


        }

    },[document.title])

    if(!imageGalleryPictures){


        return( <div className="loading-container">
            </div>)
        }

    return (
        <div className="despre-noi-container" suppressHydrationWarning>
            <div className="accordion-container">
                
            <CustomizedAccordions/>

            </div>
            <div className="despre-noi-pageContents">
                <h1>Despre noi</h1>
                {imageGalleryPictures ? 
            (<div className="despre-noi-loading">
            </div>):    
            
                (<div>
                <ImageGallery images={imageGalleryPictures[0]?.attributes?.image?.data} />
                {imageGalleryPictures[0]?.attributes?.description?.split("\n\n")?.map((element, index) => (
                    <p key={index}>{element}</p>
                ))}
                </div>)
            }
            </div>
        </div>
    );
};

export default DespreNoiReal;
