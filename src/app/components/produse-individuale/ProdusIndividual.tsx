"use client";

import React, { useEffect, useState } from 'react';
import "./ProdusIndividual.css";
import Button from '@mui/material/Button';
import {fetchPanouriData,imageFilesNonAuthUser} from '../asyncOperations/fetch/fetchAllFields';
import { fetchPanouriCommentsPerPanouId } from '../asyncOperations/fetch-by-id/fetchBYId';
import { userRelatedComments } from '../asyncOperations/populate-db';
import Comments from "../comments/Comments";
import AddCommentModal from "../coment-Modal/AddCommentModal";
import DropdownMui from "../dropdown-marimi/DropdownMarimi";
import Cookies from "js-cookie";
import Image from 'next/image';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import DropDownCustomizat from '../dropdown-marimi/DropDownCustomizat';
import { useDispatch,useSelector } from 'react-redux';
import   {addItem,removeItem,setQuantity,clearCart} from "../../../redux/cart"
import { RootState } from '../../../redux/store';
import {radioOptions,listOfMarimi,listOfCategoryExceptions,listOfMarimi2} from "../dropdown-marimi/radioOptions";
import VopsitRadio from '../DynamicRadioButtons/VopsitRadio/VopsitRadio';

interface ProdusProps{
    id:number;
    img: Array<{ id?: string; attributes: { url: string } }>;
    description:string,
    title:string,
    price:number;
    category:string;
}

const ITEMS_PER_PAGE=12;

const Produs = ({ id,img, description, title,price,category}:ProdusProps) => {
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
    const [mascaCaloriferValues, setMascaCaloriferValues] = useState({
        lungime: 80,
        inaltime: 75,
        adancime: 15,
    });
    
    const [pictureChange, setPictureChange] = useState("");
    const [originalPriceWithoutSettings, setOriginalPriceWithoutSettings] = useState(true);
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();


    useEffect(()=>{
        if(renderPersonalizare){
            setNoPrice("Pretul trebuie discutat");
        }else{
            setNoPrice("");
        }
    },
    [renderPersonalizare]);

    const [dropdownValues, setDropdownValues] = useState({
        lungime: 0,
        inaltime: 0,
        adancime: 0
    });
    
    useEffect(() => {
        if(ifVopsit){
           
            const initialPrice = price;
            
            const totalPrice = Object.values(dropdownValues).reduce((acc, val) => acc + val, initialPrice);
            const newTotal=totalPrice+(totalPrice*30)/100;
            setPrices(newTotal);
        }else{
            const initialPrice = price;
            const totalPrice = Object.values(dropdownValues).reduce((acc, val) => acc + val, initialPrice);
            setPrices(totalPrice);
        }
    }, [dropdownValues, price,ifVopsit]);

    
    const updateDropdownValue = (key, value) => {
        setDropdownValues(prev => ({ ...prev, [key]: value }));
    };
    
    
    useEffect(() => {
        const fetchDataAndFilter = async () => {
            try {
                const getUserRelatedData = await fetchPanouriData();
                let specificPanou = null;
                let comments = null;
    
                if (getUserRelatedData && getUserRelatedData.length > 0) {
                    specificPanou = getUserRelatedData.filter(item => item.attributes.title === title)[0] || null;
                    setOriginalPriceWithoutSettings(specificPanou.attributes.original_price_is_or_not);
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
        
        console.log("imagw",img);
    }, [title]);
    

    const handleCommentList = async (arg) => {
        const comments = await userRelatedComments("api::panouri-traforate.panouri-traforate", panouId, arg.message);
        const updatedComments = await fetchPanouriCommentsPerPanouId(panouId);
        setCommentList(updatedComments.data.slice(0, 12));
        setOriginalComments(updatedComments.data);
        setUserName(Cookies.get("user"));
    };


    const handleUserData = async () => {
        try {
            setAdaugaInCosShow(true);
    
            setTimeout(() => {
                setAdaugaInCosShow(false);
            }, 1000);
    
            const useros = Cookies.get("user") || null;
    
            const encodedId = category?.toLowerCase()==="masca de calorifer" ? btoa(`${id}--${mascaCaloriferValues.lungime}-${mascaCaloriferValues.inaltime}-${mascaCaloriferValues.adancime}-${ifVopsit} `) : btoa(`${id}-${selectedValues}-${ifVopsit}`);
    
            console.log(ifVopsit, "ifvopsit value in handleUserData");   

            console.log("selectedValues", selectedValues);


            const images=await imageFilesNonAuthUser();

            console.log("images from handleUserData",images);

            const imageId = images.find(image => image.url === img?.[0]?.attributes?.url)?.id || null;

            console.log("imageId found:", imageId);

            const newItem = {
                id: encodedId,
                productID: id,
                title: title,
                price: prices,
                category: category,
                selectedValues: category === "masca de calorifer"
                    ? `lungime:${mascaCaloriferValues.lungime},inaltime:${mascaCaloriferValues.inaltime},adancime:${mascaCaloriferValues.adancime}`
                    : selectedValues,
                image: img?.[0]?.attributes?.url || "",
                vopsit:ifVopsit,
                quantity: 1,
                imageId:imageId
            };
    

            
            const existingItem = cartItems.find(item => item.id === newItem.id);

            
            if (existingItem) {
                dispatch(
                setQuantity({ id: existingItem.id, quantity: existingItem.quantity + 1 })
            );
            console.log("Existing item found. Incremented quantity:", cartItems);
        } else {
                    console.log("New item to add:", newItem);
                    dispatch(addItem(newItem));
                }
    

        } catch (error) {
            console.error("Error in handleUserData:", error);
        }
    };



    const ITEMS_PER_PAGE = 12;


    const handlePageChange = (event, value) => {
        setNumberOfPages(value);
        const startIndex = (value - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        setCommentList(originalComments.slice(startIndex, endIndex));
      };


    const bifa="/bifa.png";

    const handleNevopsit = () => {
        
        setIfVopsit(false);
    };

    const handleVopsit = () => {
        setIfVopsit(true);
        
    };

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
                    width={400}
                    height={400}
                    className='produs-individual-displayed-image'
                    src={img?.length >0 && pictureChange === "" ? img?.[0]?.attributes?.url:pictureChange || "/logosDecorcut.png"}
                    alt={"current selected image from carrousel"}
                    />            
                </div>
                <div className="produs-individual-text-container">
                    <div className="produs-upper-text">
                        <div className="produs-individual-header">
                            <h2>{title}</h2>
                        </div>
                        <div className="produs-individual-header">
                           <p className="produs-individual-pret">
                            {renderPersonalizare ? "Pretul trebuie discutat":`${prices} RON`}
                            </p>
                        </div>
                    </div>
                    <div className="produs-individual-description">
                        {description}
                    </div>
                    <div>
                        {category?.toLowerCase()==="masca de calorifer" ? 
                        (<div>
                           <DropdownMui 
                                listStart={80}
                                listEndPoint={160}
                                listIncrement={20}
                                specificitati={'Lungime'} 
                                passSelectedValues={(value) => setMascaCaloriferValues(prev => ({
                                    ...prev,
                                    lungime: value 
                                }))}
                                price={(value) => updateDropdownValue('lungime', value)}
                                pretIncrementat={100} 
                            />

                        
                            <DropdownMui 
                                listStart={75}
                                listEndPoint={100}
                                listIncrement={5}
                                passSelectedValues={(value)=>setMascaCaloriferValues(prev=>({
                                    ...prev,
                                    inaltime:value
                                }))}
                                specificitati={'Inaltime'}
                                price={(value) => updateDropdownValue('inaltime', value)}
                                pretIncrementat={20}  
                            />
                        
                            <DropdownMui 
                                listStart={15}
                                listEndPoint={22}
                                listIncrement={1}
                                specificitati={'Adancime'}
                                passSelectedValues={(value)=>setMascaCaloriferValues(prev=>({
                                    ...prev,
                                    adancime:value,
                                }))}
                                price={(value) => updateDropdownValue('adancime', value)}
                                pretIncrementat={10} 
                            />
                            

                            <VopsitRadio handleNevopsit={handleNevopsit} handleVopsit={handleVopsit} />

                        </div>
                        )
                            :
                                listOfCategoryExceptions.includes(category?.toLowerCase())
                                ? 
                                (<div>

                                    <DropDownCustomizat 
                                        price={setPrices} 
                                        actualPrice={price}
                                        render={setRenderPesonalizare}
                                        onPersonalizareChange={setSelectedValues}
                                        radioOptions={radioOptions} 
                                        listOfMarimi={listOfMarimi2}
                                        pricingType="SIZES"
                                    />


                                </div>
                                )
                                :
                                    originalPriceWithoutSettings ? 
                                    null
                                    :
                                (<div>

                                    <DropDownCustomizat 
                                        price={setPrices} 
                                        actualPrice={price} 
                                        render={setRenderPesonalizare}    
                                        onPersonalizareChange={setSelectedValues}
                                        radioOptions={radioOptions}
                                        listOfMarimi={listOfMarimi}
                                        pricingType="DIMENSIONS"
                                        />

                                        </div>
                            )
                            
                            }

                    </div>
                    <Button
                        variant="contained"
                        onClick={handleUserData}
                        className='custom-button'
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