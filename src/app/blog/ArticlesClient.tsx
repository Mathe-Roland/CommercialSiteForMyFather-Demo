"use client";

import "./Articles.css";
import ArticleCard from "../components/articlesCard/ArticeCard";
import { fetchArticle } from "../components/asyncOperations/fetchData";
import { useEffect, useState } from "react";
import CommentPages from "../components/commentPages/CommentPages";
import CustomizedAccordions from "../components/accordion/Accordion";

const ArticlesClient = () => {
    
    const [articles, setArticles] = useState([]);
    const [originalArticles, setOriginalArticles] = useState([]);
    const [numberOfPages, setNumberOfPages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchArticle();
                setOriginalArticles(data);
                setArticles(data.slice(0, 3));

                const numberOfPagesF = Math.ceil(data.length / 3);
                const numberOfPagesListed = [];
                for (let i = 1; i <= numberOfPagesF; i++) {
                    numberOfPagesListed.push(i);
                }

                setNumberOfPages(numberOfPagesListed);
            } catch (error) {
            }
        };

        fetchData();
    }, []);

    const handleUserFilterComment = (commentPage) => {
        const currentPage = commentPage * 3;
        const newCommentList = originalArticles.slice(currentPage - 3, currentPage);
        setArticles(newCommentList);
    };

    return (
        <div className="articles-container" suppressHydrationWarning>
            <div className="accordion-container">

            <CustomizedAccordions/>
            </div>
            <div className="articles-center">
                <h2>Articles</h2>
                <div>
                    {articles?.map((element) => (
                        <ArticleCard
                            key={element.id}
                            id={element.id}
                            title={element.attributes.title}
                            date={element.attributes.date}
                            shortDescription={element.attributes.shortDescription}
                        />
                ))}
                </div>
                <div className="comment-pages-position">
                    <CommentPages
                        CommentIconsList={numberOfPages}
                        filterList={handleUserFilterComment}
                        inputNumberFilter={handleUserFilterComment}
                    />
                </div>
            </div>
        </div>
    );
};

export default ArticlesClient;