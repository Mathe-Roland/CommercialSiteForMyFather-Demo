"use client"
import "./IndividualArticles.css";
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { userRelatedComments, fetchArticleId, fetchArticlesData, fetchPanouriArticlePerArticleId } from "../asyncOperations/fetchData";
import Comments from "../comments/Comments";
import CommentPages from "../commentPages/CommentPages";
import AddCommentModal from "../coment-Modal/AddCommentModal";
import { cloudinaryTransformation } from "../functions/regexconversion";
import Image from "next/image";
import Cookies from "js-cookie";


const IndividualArticles = () => {
    const { articleId } = useParams();
    const [articleData, setArticleData] = useState([]);
    const [descriptionBrokenInThree, setDescriptionBrokenInThree] = useState([]);
    const [articleIds, setArticleIds] = useState("");
    const [commentList, setCommentList] = useState([]);
    const [originalComments, setOriginalComments] = useState([]);
    const [numberOfPages, setNumberOfPages] = useState([]);
    const [username, setUserName] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDataAndFilter = async () => {
            try {
                const getUserRelatedData = await fetchArticlesData();
                if (getUserRelatedData && getUserRelatedData.length > 0) {
                    const specificPanou = getUserRelatedData.find(item => item.id === Number(articleId));
                    if (specificPanou) {
                        setArticleIds(specificPanou.id);
                        const comments = await fetchPanouriArticlePerArticleId(specificPanou.id);
                        if (comments?.data) {
                            setCommentList(comments.data.slice(0, 12));
                            setOriginalComments(comments.data);
                        }
                    }
                }
            } catch (error) {
            } finally {
                setLoading(false);
            }
        };
        fetchDataAndFilter();
    }, [articleId]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchArticleId(articleId);
            if (data && data.length > 0) {
                setDescriptionBrokenInThree(data[0].attributes.description.split('\n\n'));
                setArticleData(data);
            }
        }
        fetchData();
    }, [articleId]);

    useEffect(() => {
        const commentLength = originalComments.length;
        const numberOfPagesF = Math.ceil(commentLength / 12);
        const numberOfPagesListed = Array.from({ length: numberOfPagesF }, (_, i) => i + 1);
        setNumberOfPages(numberOfPagesListed);
    }, [commentList.length, originalComments.length]);

    const handleCommentList = async (arg) => {
        const url = "api::article.article";
        const comments = await userRelatedComments(url, articleId, arg.message);
        const fetchDataAndFilter = async () => {
            try {
                const getUserRelatedData = await fetchArticlesData();
                if (getUserRelatedData && getUserRelatedData.length > 0) {
                    const specificPanou = getUserRelatedData.find(item => item.id === articleId);
                    if (specificPanou) {
                        setArticleIds(specificPanou.id);
                        const comments = await fetchPanouriArticlePerArticleId(specificPanou.id);
                        if (comments?.data) {
                            const currentPage = Math.floor(originalComments.length / 12) * 12;
                            setCommentList(comments.data.slice(currentPage, currentPage + 12));
                            setOriginalComments(comments.data);
                        }
                    }
                }
            } catch (error) {
            }
        };
        fetchDataAndFilter();
        setUserName(Cookies.get("user"));
    }

    const handleUserFilterCommet = (commentPage) => {
        const currentPage = commentPage * 12;
        setCommentList(originalComments.slice(currentPage - 12, currentPage));
    }

    if (loading) {
        return <div className="loading-container">
        </div>;
    }

    return (
        <div className="IndividualArticles-container">
            <h1>{articleData[0]?.attributes?.title}</h1>
            <p>{articleData[0]?.attributes?.date}</p>
            <p>{descriptionBrokenInThree[0]}</p>
            <div className="images-container">
                <Image className="image" src={`${cloudinaryTransformation(articleData[0]?.attributes?.image?.data[0]?.attributes?.url,250,250)}`}  
                width={250}
                height={250}/>
            </div>
            <p>{descriptionBrokenInThree[1]}</p>
            <div className="images-container">
                <Image className="image" src={`${cloudinaryTransformation(articleData[0]?.attributes?.image?.data[1]?.attributes?.url,250,250)}`} 
                height={250}
                width={250}/>
            </div>
            <p>{descriptionBrokenInThree[2]}</p>
            <div className="images-container">
                <Image className="image" src={`${cloudinaryTransformation(articleData[0]?.attributes?.image?.data[2]?.attributes?.url,250,250)}`} 
                height={250}
                width={250}/>
            </div>
            <p>{descriptionBrokenInThree[3]}</p>
            <div className="comment-header">
                <h3>Commentarii</h3>
                <AddCommentModal addComment={handleCommentList} />
            </div>
            <div className="comment-box">
                {commentList?.map((element) => (
                    <Comments key={element.id}
                        id={element.id}
                        panouId={articleIds}
                        user={username}
                        username={element?.author?.name}
                        comments={element.content} />
                ))}
                <CommentPages filterList={handleUserFilterCommet}
                    inputNumberFilter={handleUserFilterCommet}
                    CommentIconsList={numberOfPages} />
            </div>
        </div>
    )
}

export default IndividualArticles;
