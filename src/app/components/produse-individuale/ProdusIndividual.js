import React, { useEffect, useState } from 'react';
import "./ProdusIndividual.css";
import Button from '@mui/material/Button';
import { fetchPanouriData, fetchPanouriCommentsPerPanouId, updateProductData, userData, userRelatedComments, userIds, imageFiles, userRelatedData } from "../asyncOperations/fetchData";
import Comments from "../comments/Comments";
import AddCommentModal from "../coment-Modal/AddCommentModal";
import CommentPages from "../commentPages/CommentPages"; 
import DropdownMui from "../dropdown-marimi/DropdownMarimi";
import Cookies from "js-cookie";
import Image from 'next/image';

const Produs = ({ img, description, title, price }) => {
    const [commentList, setCommentList] = useState([]);
    const [username, setUserName] = useState("");
    const [panouId, setPanouId] = useState("");
    const [numberOfPages, setNumberOfPages] = useState([]);
    const [originalComments, setOriginalComments] = useState([]);
    const [selectedValues, setSelectedValues] = useState("");
    const [renderPersonalizare, setRenderPesonalizare] = useState(false);
    const [prices, setPrices] = useState(price);
    const [ifVopsit, setIfVopsit] = useState(false);

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
                console.error('Error fetching data:', error);
            }
        };
        fetchDataAndFilter();
    }, [title]);
    
    useEffect(() => {
        const commentLength = originalComments.length;
        const numberOfPagesF = Math.ceil(commentLength / 12);
        const numberOfPagesListed = [];
        for (let i = 1; i <= numberOfPagesF; i++) {
            numberOfPagesListed.push(i);
        }
        setNumberOfPages(numberOfPagesListed);
    }, [originalComments.length]);
    
    const handleCommentList = async (arg) => {
        const comments = await userRelatedComments("api::panouri-traforate.panouri-traforate", panouId, arg.message);
        const updatedComments = await fetchPanouriCommentsPerPanouId(panouId);
        setCommentList(updatedComments.data.slice(0, 12));
        setOriginalComments(updatedComments.data);
        setUserName(Cookies.get("user"));
    };
    
    const handleUserData = async () => {
        try {
            const data = await userData();
            const filteredSpecificPanouUserRelatedData = data.data.filter(element => element.attributes.title === title);
            const filteredOptiuniNormale = filteredSpecificPanouUserRelatedData.filter(element => element.attributes.optiuniNormale === selectedValues);
    
            if (filteredSpecificPanouUserRelatedData.length > 0) {
                if (filteredOptiuniNormale.length > 0) {
                    const newDatas = { price: price, optiuninormale: selectedValues };
                    await updateProductData(filteredOptiuniNormale[0].id, filteredOptiuniNormale[0].attributes.quantity + 1, newDatas);
                } else {
                    const images = Cookies.get("image");
                    const filesData = await imageFiles();
                    const currentImage = filesData.filter(image => image.url === images);
                    const id = await userIds();
                    const newDatas = { price: ifVopsit ? prices : handlePrice(selectedValues), optiuninormale: selectedValues };
                    await userRelatedData(id, currentImage[0].id, newDatas);
                }
            } else {
                const images = Cookies.get("image");
                const filesData = await imageFiles();
                const currentImage = filesData.filter(image => image.url === images);
                const id = await userIds();
                const newDatas = { price: ifVopsit ? prices : handlePrice(selectedValues), optiuninormale: selectedValues };
                await userRelatedData(id, currentImage[0].id, newDatas);
            }
        } catch (error) {
            console.error("Error in handleUserData:", error);
        }
    };

    const handleUserFilterComment = (commentPage) => {
        const currentPage = commentPage * 12;
        const newCommentList = originalComments.slice(currentPage - 12, currentPage);
        setCommentList(newCommentList);
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

    return (
        <div className="produs-individual-container">
            <div className="produs-individual-columns">
                <div className="produs-individual-images">
                    <Image src={`${img ? img:""}`} alt="failed-load" width={500} height={250} />
                </div>
                <div className="produs-individual-text-container">
                    <div className="produs-upper-text">
                        <div className="produs-individual-header">
                            <h2>{title}</h2>
                        </div>
                        <div className="produs-individual-header">
                           <p className="produs-individual-pret">{ifVopsit ? prices : handlePrice(selectedValues)} RON</p>
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
                            backgroundColor: "black",
                            marginTop: "50px",
                            width: "50%",
                            maxWidth: "300px",
                            marginBottom: "100px",
                            "&:hover": {
                                backgroundColor: "red"
                            }
                        }}
                    >
                        Adauga in cos
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
                        user={username}
                        username={element?.author?.name}
                        comments={element.content}
                    />
                ))}
                <CommentPages
                    filterList={handleUserFilterComment}
                    inputNumberFilter={handleUserFilterComment}
                    CommentIconsList={numberOfPages}
                />
            </div>
        </div>
    );
};

export default Produs;
