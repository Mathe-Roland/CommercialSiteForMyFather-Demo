"use client";

import "./IndividualArticles.css";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  userRelatedComments,
  fetchArticleId,
  fetchArticlesData,
  fetchPanouriArticlePerArticleId,
} from "../asyncOperations/fetchData";
import Comments from "../comments/Comments";
import AddCommentModal from "../coment-Modal/AddCommentModal";
import Image from "next/image";
import Cookies from "js-cookie";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

const ITEMS_PER_PAGE = 12;

const IndividualArticles = () => {
  const { articleId } = useParams();
  const [articleData, setArticleData] = useState([]);
  const [descriptionSections, setDescriptionSections] = useState([]);
  const [articleIds, setArticleIds] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [originalComments, setOriginalComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [username, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const data = await fetchArticleId(articleId);
        if (data && data.length > 0) {
          setDescriptionSections(data[0].attributes.description.split("\n\n"));
          setArticleData(data);
        }

        const allArticles = await fetchArticlesData();
        if (allArticles && allArticles.length > 0) {
          const specificPanou = allArticles.find(
            (item) => item.id === Number(articleId)
          );
          if (specificPanou) {
            setArticleIds(specificPanou.id);

            const comments = await fetchPanouriArticlePerArticleId(
              specificPanou.id
            );
            if (comments?.data) {
              setOriginalComments(comments.data);
              setCommentList(comments.data.slice(0, ITEMS_PER_PAGE));
            }
          }
        }
      } catch (error) {
        console.error("Error fetching article or comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [articleId]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    const startIndex = (value - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setCommentList(originalComments.slice(startIndex, endIndex));
  };

  const handleAddComment = async (arg) => {
    try {
      const url = "api::article.article";
      await userRelatedComments(url, articleId, arg.message);

      const comments = await fetchPanouriArticlePerArticleId(articleIds);
      if (comments?.data) {
        setOriginalComments(comments.data);
        setCommentList(comments.data.slice(0, ITEMS_PER_PAGE));
        setCurrentPage(1);
      }

      setUserName(Cookies.get("user"));
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div className="IndividualArticles-container">
      <h1>{articleData[0]?.attributes?.title}</h1>
      <p>{articleData[0]?.attributes?.date}</p>

      {descriptionSections.map((section, index) => (
        <div key={index}>
          <p>{section}</p>
          {articleData[0]?.attributes?.image?.data[index]?.attributes?.url && (
            <div className="images-container">
              <Image
                className="image"
                alt={`Article Image ${index + 1}`}
                src={
                  articleData[0]?.attributes?.image?.data[index]?.attributes
                    ?.url || "/default-image.png"
                }
                width={250}
                height={250}
              />
            </div>
          )}
        </div>
      ))}

      <div className="comment-header">
        <h3>Comments</h3>
        <AddCommentModal addComment={handleAddComment} />
      </div>
      <div className="comment-box">
        {commentList.map((element) => (
          <Comments
            key={element.id}
            id={element.id}
            panouId={articleIds}
            username={element?.author?.name}
            comments={element.content}
          />
        ))}

        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(originalComments.length / ITEMS_PER_PAGE)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
      </div>
    </div>
  );
};

export default IndividualArticles;
