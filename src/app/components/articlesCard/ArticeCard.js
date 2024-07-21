
import React from 'react';
import './ArticleCard.css'; // You can define your CSS styles for the article card in this file
import  Link  from "next/link"; // Use next/link instead of react-router-dom

const ArticleCard = ({ title, date, shortDescription, id }) => {
  return (
    <div className="article-card">
      <h2 className="article-title">{title}</h2>
      <p className="article-date">{date}</p>
      <p className="article-description">{shortDescription}</p>
      <Link href={`/blog/${id}`} className="read-more">Citeste mai mult</Link>
    </div>
  );
}

export default ArticleCard;
