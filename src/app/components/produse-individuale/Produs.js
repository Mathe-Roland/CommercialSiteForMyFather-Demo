import "./Produs.css";
import Button from '@mui/material/Button';
import 'react-medium-image-zoom/dist/styles.css';
import ImageZoom from "../ImageZoom/zoomedInImage";
import { userIds, imageFiles, userRelatedData, userData } from "../asyncOperations/fetchData";
import { useEffect, useState } from "react";
import Comments from "../comments/Comments";
import AddCommentModal from "../coment-Modal/AddCommentModal";
import { userRelatedComments, fetchPanouriCommentsPerPanouId, updateProductData } from "../asyncOperations/fetchData";
import fetchPanouriData from "../asyncOperations/fetchData";
import CommentPages from "../commentPages/CommentPages"; 
import axios from "axios";
import DropdownMui from "../dropdown-marimi/DropdownMarimi";
import Cookies from "js-cookie";

const Produs = ({ img, description, title, price: initialPrice }) => {
    const [commentList, setCommentList] = useState([]);
    const [username, setUserName] = useState("");
    const [panouId, setPanouId] = useState("");
    const [numberOfPages, setNumberOfPages] = useState([]);
    const [originalComments, setOriginalComments] = useState([]);
    const [selectedValues, setSelectedValues] = useState("");
    const [renderPersonalizare, setRenderPesonalizare] = useState(false);
    const [price, setPrice] = useState(initialPrice);

    useEffect(() => {
        const fetchDataAndFilter = async () => {
            try {
                const getUserRelatedData = await fetchPanouriData();
               
                let specificPanou = null;
                let comments = null;
    
                if (getUserRelatedData && getUserRelatedData.length > 0) {
                    specificPanou = getUserRelatedData.filter(item => item.attributes.title === title)[0] || null;
                    setPanouId(specificPanou.id);
                    console.log(specificPanou.id);
                    if (specificPanou) {
                        comments = await fetchPanouriCommentsPerPanouId(specificPanou.id) || null;
                        console.log(comments.data);
                        setCommentList(comments.data.slice(0, 12));
                        setOriginalComments(comments.data);
                    } else {
                        console.log('No matching items found');
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
        console.log(commentLength);
        const numberOfPagesF = Math.ceil(commentLength / 12);
        const numberOfPagesListed = [];
        console.log(numberOfPagesF);
        for (let i = 1; i <= numberOfPagesF; i++) {
            numberOfPagesListed.push(i);
        }
        setNumberOfPages(numberOfPagesListed);
    }, [commentList.length, originalComments.length]);

    const handleCommentList = async (arg) => {
        const url = "api::panouri-traforate.panouri-traforate";
        const comments = await userRelatedComments(url, panouId, arg.message);

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
                        console.log(comments.data);
                        const currentPage = Math.floor(originalComments.length / 12) * 12;
                        const newCommentList = comments.data.slice(currentPage, currentPage + 12);
                       
                        setCommentList(newCommentList);
                        setOriginalComments(comments.data);
                    } else {
                        console.log('No matching items found');
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDataAndFilter();
        setUserName(Cookies.get("user"));
        console.log(arg);
    };

    const handleUserData = async () => {
        try {
            const data = await userData();
            const filteredSpecificPanouUserRelatedData = data.data.filter(
                (element) => element.attributes.title === title
            );
            const filteredOptiuniNormale = filteredSpecificPanouUserRelatedData.filter(
                (element) => element.attributes.optiuniNormale === selectedValues
            );
    
            if (filteredSpecificPanouUserRelatedData.length > 0) {
                if (filteredOptiuniNormale.length > 0) {
                    const newDatas = {
                        price: calculatePrice(selectedValues),
                        optiuninormale: selectedValues,
                    };
                    await updateProductData(
                        filteredOptiuniNormale[0].id,
                        filteredOptiuniNormale[0].attributes.quantity + 1,
                        newDatas
                    );
                } else {
                    const images = Cookies.get("image");
                    const filesData = await imageFiles();
                    const currentImage = filesData.filter(
                        (image) => image.url === images
                    );
                    const id = await userIds();
                    const newDatas = {
                        price: calculatePrice(selectedValues),
                        optiuninormale: selectedValues,
                    };
                    await userRelatedData(id, currentImage[0].id, newDatas);
                }
            } else {
                const images = Cookies.get("image");
                const filesData = await imageFiles();
                const currentImage = filesData.filter((image) => image.url === images);
                const id = await userIds();
                console.log(currentImage, images, id);
                const newDatas = {
                    price: calculatePrice(selectedValues),
                    optiuninormale: selectedValues,
                };
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

    const calculatePrice = (selectedValue) => {
        let newPrice = initialPrice;

        if (renderPersonalizare) {
            newPrice += (initialPrice * 10) / 100;
        }

        if (selectedValue === "option1") {
            newPrice = initialPrice;
        }

        if (selectedValue === "option2") {
            newPrice = initialPrice * 2;
        }

        if (selectedValue === "option3") {
            newPrice = initialPrice * 3;
        }

        return newPrice;
    };

    useEffect(() => {
        setPrice(calculatePrice(selectedValues));
    }, [selectedValues, renderPersonalizare]);

    return (
        <div className="produs">
            <div className="produs-container">
                <div className="produs-images">
                    <ImageZoom imageUrl={`${process.env.NEXT_PUBLIC_STRAPI_URL}${img}`} alt="failed-load" />
                </div>
                <div className="produs-text-container">
                    <div className="produs-upper-text">
                        <div className="produs-header-plus-description">
                            <h2>{title}</h2>
                        </div>
                        <div className="produs-pret">
                            <p className="produs-pret">{price}</p>
                        </div>
                    </div>
                    <div className="produs-lower-text">
                       {description}
                    </div>
                    <div>
                        <DropdownMui
                            price={setPrice}
                            onChange={setSelectedValues}
                            render={setRenderPesonalizare}
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
                {commentList?.map((element) => (
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
