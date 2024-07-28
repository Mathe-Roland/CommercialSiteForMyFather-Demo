"use client";

import "./DespreNoiReal.css";
import { useState, useEffect } from "react";
import ImageGallery from "../components/imageGallery/ImageGallery";
import { fetchDataDespreNoiPage } from "../components/asyncOperations/fetchData";
import CustomizedAccordions from "../components/accordion/Accordion";
import Loading from "../components/animations/loading";

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
                <Loading/>
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
                <Loading/>
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
