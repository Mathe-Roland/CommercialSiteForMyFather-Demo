"use client";

import "./DespreNoiReal.css";
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

    if(!imageGalleryPictures){


        return( <div className="loading container">
                 <div class="sk-chase">
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            </div>
            </div>)
        }

    return (
        <div className="DespreNoiReal-container" suppressHydrationWarning>
            <div className="accordion-container">
                
            <CustomizedAccordions/>

            </div>
            <div className="despreNoiReal-pageContents">
                <h1>Despre noi</h1>
                {imageGalleryPictures ? 
            (<div>
                 <div class="sk-chase">
                    <div class="sk-chase-dot"></div>
                     <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                     <div class="sk-chase-dot"></div>
                     <div class="sk-chase-dot"></div>
                     <div class="sk-chase-dot"></div>
            </div>
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
