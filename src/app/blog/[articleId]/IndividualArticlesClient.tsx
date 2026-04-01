"use client";

import "./IndividualArticles.css";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { userRelatedComments } from "../../components/asyncOperations/populate-db";
import { fetchArticlesData } from "../../components/asyncOperations/fetch/fetchAllFields";
import { fetchPanouriArticlePerArticleId,fetchArticleId } from "../../components/asyncOperations/fetch-by-id/fetchBYId";
import Comments from "../../components/comments/Comments";
import AddCommentModal from "../../components/coment-Modal/AddCommentModal";
import Cookies from "js-cookie";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

const IndividualArticlesClient = () => {
  const { articleId } = useParams();

  const [articleData, setArticleData] = useState([]);
  const [descriptionBrokenInThree, setDescriptionBrokenInThree] = useState([]);
  const [articleIds, setArticleIds] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [originalComments, setOriginalComments] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [username, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const commentsPerPage = 12;
  const normalizedId = Array.isArray(articleId)
    ? articleId[0]
    : articleId;
  
  const realId = normalizedId?.split("-")[0];

  useEffect(() => {
    const fetchDataAndFilter = async () => {
      try {
        const userData = await fetchArticlesData();
        if (userData && userData.length > 0) {
          const specificPanou = userData.find(
            (item) => item.id === Number(realId)
          );
          if (specificPanou) {
            setArticleIds(specificPanou.id);
            const comments = await fetchPanouriArticlePerArticleId(
              specificPanou.id
            );
            if (comments?.data) {
              setCommentList(comments.data.slice(0, commentsPerPage));
              setOriginalComments(comments.data);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchArticleData = async () => {
      try {
        console.log("Fetching article data for ID:", articleId);

        const id = Array.isArray(articleId)
            ? articleId[0].split("-")[0]
            : articleId?.split("-")[0];
        const data = await fetchArticleId(id);
        if (data && data.length > 0) {
          setArticleData(data);
          const description = data[0]?.attributes?.description|| "";

          const length = description.length;
          const partSize = Math.ceil(length / 3);

          const parts = [
            description.slice(0, partSize),
            description.slice(partSize, partSize * 2),
            description.slice(partSize * 2),
          ];


          setDescriptionBrokenInThree(parts);


        }
      } catch (error) {
        console.error("Error fetching article data:", error);
      }
    };

    fetchArticleData();
    fetchDataAndFilter();
  }, [articleId]);

  useEffect(() => {
    const commentLength = originalComments.length;
    const pages = Math.ceil(commentLength / commentsPerPage);
    setNumberOfPages(pages);
  }, [originalComments.length]);

  const handleCommentList = async (newComment) => {
    try {
      const url = "api::article.article";
      await userRelatedComments(url, realId, newComment.message);

      const comments = await fetchPanouriArticlePerArticleId(articleIds);
      if (comments?.data) {
        setOriginalComments(comments.data);
        setCommentList(comments.data.slice(0, commentsPerPage));
      }
      setUserName(Cookies.get("user"));
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handlePageChange = (event, page) => {
    const start = (page - 1) * commentsPerPage;
    const end = page * commentsPerPage;
    setCommentList(originalComments.slice(start, end));
  };

  if (loading) {
    return <div className="articles-loading-screen">Loading...</div>;
  }

  return (
    <div className="IndividualArticles-container" suppressHydrationWarning>
      <h1>{articleData[0]?.attributes?.title}</h1>
      <p>{articleData[0]?.attributes?.date}</p>
      <p>{descriptionBrokenInThree[0]}</p>
      <div className="images-container">
        <Image
          className="image"
          src={
            articleData[0]?.attributes?.image?.data[0]?.attributes?.url ||
            "/logosDecorcut.png"
          }
          width={250}
          height={250}
          alt="Article Image 1"
        />
      </div>
      <p>{descriptionBrokenInThree[1]}</p>
      <div className="images-container">
        <Image
          className="image"
          src={
            articleData[0]?.attributes?.image?.data[1]?.attributes?.url ||
            "/logosDecorcut.png"
          }
          width={250}
          height={250}
          alt="Article Image 2"
        />
      </div>
      <p>{descriptionBrokenInThree[2]}</p>
      <div className="images-container">
        <Image
          className="image"
          src={
            articleData[0]?.attributes?.image?.data[2]?.attributes?.url ||
            "/logosDecorcut.png"
          }
          width={250}
          height={250}
          alt="Article Image 3"
        />
      </div>
      <p>{descriptionBrokenInThree[3]}</p>
      <div className="comment-header">
        <h3>Comments</h3>
        <AddCommentModal addComment={handleCommentList} />
      </div>
      <div className="comment-box">
        {commentList?.map((comment) => (
          <Comments
            key={comment.id}
            id={comment.id}
            panouId={articleIds}
            username={comment?.author?.name}
            comments={comment.content}
          />
        ))}
      </div>
    <Stack spacing={2}>
          <Pagination
            count={numberOfPages}
            color="primary"
            onChange={handlePageChange}
          />
    </Stack>
    </div>
  );
};

export default IndividualArticlesClient;
