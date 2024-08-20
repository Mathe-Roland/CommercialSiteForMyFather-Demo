'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { userRelatedComments, fetchArticleId, fetchArticlesData, fetchPanouriArticlePerArticleId } from "../../components/asyncOperations/fetchData";
import Comments from "../../components/comments/Comments";
import CommentPages from "../../components/commentPages/CommentPages"
import AddCommentModal from "../../components/coment-Modal/AddCommentModal";
import Image from 'next/image';
import Cookies from "js-cookie";
import Head from 'next/head';

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
        // Dynamically load the CSS after the component mounts
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/path/to/IndividualArticles.css';
        document.head.appendChild(link);
    }, []);

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
        return( <div className="articles-loading-screen">
             
        
        </div>);
    }

    return (
        <div className="IndividualArticles-container" suppressHydrationWarning>
            <Head>
                {/* Preload the IndividualArticles CSS */}
                <link
                    rel="preload"
                    href="/path/to/IndividualArticles.css"
                    as="style"
                />
            </Head>
            <h1>{articleData[0]?.attributes?.title}</h1>
            <p>{articleData[0]?.attributes?.date}</p>
            <p>{descriptionBrokenInThree[0]}</p>
            <div className="images-container">
                <Image className="image" src={` ${ articleData ? articleData[0]?.attributes?.image?.data[0]?.attributes?.url :""}`}
                width={250}
                height={250} />
            </div>
            <p>{descriptionBrokenInThree[1]}</p>
            <div className="images-container">
                <Image className="image" src={`${articleData ? articleData[0]?.attributes?.image?.data[1]?.attributes?.url : ""}`} 
                width={250}
                height={250}/>
            </div>
            <p>{descriptionBrokenInThree[2]}</p>
            <div className="images-container">
                <Image className="image" src={`${articleData ? articleData[0]?.attributes?.image?.data[2]?.attributes?.url : ""}`} 
                width={250}
                height={250}/>
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
