"use client";

import "./Articles.css";
import ArticleCard from "../components/articlesCard/ArticeCard";
import { fetchArticle } from "../components/asyncOperations/fetch/fetchAllFields";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useMediaQuery } from "@mui/material";

const ArticlesClient = () => {
  const [articles, setArticles] = useState([]); 
  const [originalArticles, setOriginalArticles] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const isMobile = useMediaQuery("(min-width: 768px)"); 
  const ARTICLES_PER_PAGE = isMobile ? 6 : 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchArticle();
        setOriginalArticles(data);

        setArticles(data.slice(0, ARTICLES_PER_PAGE));
        setNumberOfPages(Math.ceil(data.length / ARTICLES_PER_PAGE));
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchData();
  }, [ARTICLES_PER_PAGE]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);

    const startIndex = (value - 1) * ARTICLES_PER_PAGE;
    const endIndex = startIndex + ARTICLES_PER_PAGE;
    setArticles(originalArticles.slice(startIndex, endIndex));
  };

  return (
    <div className="articles-container" suppressHydrationWarning>
      <div>
        <h2>Articles</h2>

        <div className="aricles-grid">
          {articles.map((element) => (
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
          <Stack spacing={2}>
            <Pagination
              count={numberOfPages} 
              page={currentPage} 
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default ArticlesClient;
