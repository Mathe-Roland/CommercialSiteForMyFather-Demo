"use client";

import React, { useEffect, useState } from 'react';
import "./ProdusIndividual.css";
import Button from '@mui/material/Button';
import {imageNonREgisteredUser,nonRegisteredUserData,updateNonRegisteredUserData,postNonRegisteredUserComanda,fetchPanouriData, fetchPanouriCommentsPerPanouId, updateProductData, userData, userRelatedComments, userIds, imageFiles, userRelatedData } from "../asyncOperations/fetchData";
import Comments from "../comments/Comments";
import AddCommentModal from "../coment-Modal/AddCommentModal";
import DropdownMui from "../dropdown-marimi/DropdownMarimi";
import Cookies from "js-cookie";
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid'; 
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface ProdusProps{
    img: Array<{ id?: string; attributes: { url: string } }>;
    description:string,
    title:string,
    price:number,
}

const ITEMS_PER_PAGE=12;

const Produs = ({ img, description, title, price }:ProdusProps) => {
    const [commentList, setCommentList] = useState([]);
    const [username, setUserName] = useState("");
    const [panouId, setPanouId] = useState("");
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [originalComments, setOriginalComments] = useState([]);
    const [selectedValues, setSelectedValues] = useState("");
    const [renderPersonalizare, setRenderPesonalizare] = useState(false);
    const [prices, setPrices] = useState(price);
    const [noPrice,setNoPrice ] = useState("");
    const [ifVopsit, setIfVopsit] = useState(false);
    const [adaugaInCosShow, setAdaugaInCosShow] = useState(false);
    const [pictureChange, setPictureChange] = useState("");


    useEffect(()=>{
        if(renderPersonalizare){
            setNoPrice("The price must be discussed");
        }else{
            setNoPrice("");
        }
    },
    [renderPersonalizare])

    useEffect(() => {
        const fetchDataAndFilter = async () => {
            try {
                const getUserRelatedData = await fetchPanouriData();
                let specificPanou = null;
                let comments = null;
    
                if (getUserRelatedData && getUserRelatedData.length > 0) {
                    specificPanou = getUserRelatedData.filter(item => item.attributes.title === title)[0] || null;
                    setPanouId(specificPanou.id);
                    if (specificPanou) {
                        comments = await fetchPanouriCommentsPerPanouId(specificPanou.id) || null;
                        setCommentList(comments.data.slice(0, 12));
                        setOriginalComments(comments.data);
                    } else {
                    }
                }
            } catch (error) {

            }
        };
        fetchDataAndFilter();
    }, [title]);
    

    const handleCommentList = async (arg) => {
        const comments = await userRelatedComments("api::panouri-traforate.panouri-traforate", panouId, arg.message);
        const updatedComments = await fetchPanouriCommentsPerPanouId(panouId);
        setCommentList(updatedComments.data.slice(0, 12));
        setOriginalComments(updatedComments.data);
        setUserName(Cookies.get("user"));
    };
    

    const handleUserData = async () => {
        setAdaugaInCosShow(true);
        

        setTimeout(() => {
            setAdaugaInCosShow(false);
        }, 1000);
    
        
        Cookies.set("isInCart", true, {secure: true,
            sameSite: 'Strict',
            expires: 7,   
            path: '/', });

        try {
            const useros = Cookies.get("user") || null;
    
            let userUuid = typeof window !== 'undefined' ? Cookies.get('userUUID') : null;
    
            if (!userUuid) {
                userUuid = uuidv4();
                if (typeof window !== 'undefined') {
                    Cookies.set("userUUID", userUuid, {secure: true,
                        sameSite: 'Strict',
                        expires: 7,   
                        path: '/', });
                }
            }
            
            
            if (!useros) {
                const nonregisteredData = await nonRegisteredUserData();
    
                const filteredSpecificPanouNonRegisteredUser = nonregisteredData.data.filter(element => element.attributes.title === title);

                const filteredOptiuniNonRegistered = filteredSpecificPanouNonRegisteredUser.filter(element => element.attributes.optiuniNormale === selectedValues);

                const vopsit=filteredOptiuniNonRegistered.filter(e=>e.attributes.vopsit===true);
                const nevopsit=filteredOptiuniNonRegistered.filter(e=>e.attributes.vopsit===false);
                
                const images = Cookies.get("image");

                
                const filesData = await imageNonREgisteredUser();
                
                const currentImage = filesData.filter(image => image.url === images);
                
                const newDatas = {
                    price: Math.floor(ifVopsit ? prices : handlePrice(selectedValues)),
                    UniqueIdentifier: userUuid,
                    optiuninormale: selectedValues,
                    vopsit:ifVopsit,
                };



                if(vopsit.length>0 && ifVopsit===true){


                    await updateNonRegisteredUserData(vopsit[0].id,vopsit[0].attributes.quantity + 1, newDatas);
        
                }else if(nevopsit.length>0 && ifVopsit===false){

                    await updateNonRegisteredUserData(nevopsit[0].id,nevopsit[0].attributes.quantity + 1, newDatas);

                }else{

                    await postNonRegisteredUserComanda(currentImage[0].id,newDatas,1);

                }
                   

            } else {
                const data = await userData();
                const filteredSpecificPanouUserRelatedData = data.length>0 ? data.data.filter(element => element.attributes.title === title):[];
                const filteredOptiuniNormale =data.length>0 ? filteredSpecificPanouUserRelatedData.filter(element => element.attributes.optiuniNormale === selectedValues):[];
                const filteredVopsit = filteredOptiuniNormale.filter(
                    (item) => item.attributes.vopsit === true
                );
                const filteredNevopsit = filteredOptiuniNormale.filter(
                    (item) => item.attributes.vopsit === false
                );
                                
    
                const images = Cookies.get("image");
                const filesData = await imageFiles();
                const currentImage = filesData.filter(image => image.url === images);
                const newDatas = {
                    price: ifVopsit ? prices : handlePrice(selectedValues),
                    optiuninormale: selectedValues
                };



                if(filteredVopsit.length>0 && ifVopsit===true){


                    await updateProductData(filteredVopsit[0].id, filteredVopsit[0].attributes.quantity + 1, newDatas);
        
                }else if(filteredNevopsit.length>0 && ifVopsit===false){

                    await updateProductData(filteredNevopsit[0].id, filteredNevopsit[0].attributes.quantity + 1, newDatas);

                }else{

                    await userRelatedData(Cookies.get("userId"), currentImage[0].id, newDatas);

                }              
            }
        } catch (error) {
            console.error('Error:', error);
        }

        window.location.reload();
    };
    
    const ITEMS_PER_PAGE = 12;


    const handlePageChange = (event, value) => {
        setNumberOfPages(value);
        const startIndex = (value - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        setCommentList(originalComments.slice(startIndex, endIndex));
      };

    const handlePrice = (selectedValue) => {
        if (renderPersonalizare === true) {
            
            return (price * 10) / 100 + price;
        }
        if (selectedValue === "option1") {
            return price * 1;
        }
        if (selectedValue === "option2") {
            return price * 2;
        }
        if (selectedValue === "option3") {
            return price * 3;
        }
    };

    const bifa="/bifa.png";
    

    return (
        <div className="produs-individual-container">
            <div className="produs-individual-columns">
                <div className="produs-individual-images">

                <div className='produs-images-choice'>
                    
            {img?.length > 0 ? (
                img.map((e) => (  
                <div key={e.id} className="imageContainer"
                onMouseOver={()=>setPictureChange(e.attributes.url)}>
                    <Image
                    src={e.attributes.url}
                    alt="produs-individual-images"
                    layout="fill"
                    objectFit="cover"
                    />
                </div>
                ))
            ) : null}
                    </div>    
                    <Image
                            src={`${img?.length >0 && pictureChange === "" ? img?.[0]?.attributes?.url:pictureChange}`} alt="current selected image from carrousel" 
                            width={400}
                            height={400}
                            className='produs-individual-displayed-image'
                    />
                </div>
                <div className="produs-individual-text-container">
                    <div className="produs-upper-text">
                        <div className="produs-individual-header">
                            <h2>{title}</h2>
                        </div>
                        <div className="produs-individual-header">
                           <p className="produs-individual-pret">{noPrice.length>0 ? noPrice : ifVopsit ? `${prices} RON`: `${handlePrice(selectedValues)} RON`}</p>
                        </div>
                    </div>
                    <div className="produs-individual-description">
                        {description}
                    </div>
                    <div>
                        <DropdownMui
                            onChange={setSelectedValues}
                            render={setRenderPesonalizare}
                            actualPrice={handlePrice(selectedValues)}
                            price={setPrices}
                            vopsit={setIfVopsit}
                        />
                    </div>
                    <Button
                        variant="contained"
                        onClick={handleUserData}
                        sx={{
                            backgroundColor: "green",
                            marginTop: "50px",
                            width: "50%",
                            height:"50px",
                            maxWidth: "300px",
                            marginBottom: "100px",
                            "&:hover": {
                                backgroundColor: "red"
                            }
                        }}
                    >
                        Adauga in cos
                    {adaugaInCosShow ? (<div>
                        <Image src={`${bifa ? bifa:null}`} width={50} height={50} alt="bifa"/>
                    </div>):null}
                    </Button>
                </div>
            </div>
            <div className="comment-header">
                <h3>Commentarii</h3>
                <AddCommentModal addComment={handleCommentList} />
            </div>
            <div className="comment-box">
                {commentList.map(element => (
                    <Comments
                        key={element.id}
                        id={element.id}
                        panouId={panouId}
                        username={element?.author?.name}
                        comments={element.content}
                    />
                ))}
                
            </div>
                 <Stack spacing={2}>
                    <Pagination
                        count={Math.ceil(originalComments.length / ITEMS_PER_PAGE)}
                        page={numberOfPages}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </Stack>
        </div>
    );
};

export default Produs;
