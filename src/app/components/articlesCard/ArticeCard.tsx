
import React from 'react';
import './ArticleCard.css'; 
import  Link  from "next/link";

interface ArticleProps{
  title:string,
  date:string,
  shortDescription:string,
  id:string
}

const ArticleCard = ({ title, date, shortDescription, id }:ArticleProps) => {
  return (
    <div className="article-card">
      <h2 className="article-title">{title}</h2>
      <p className="article-date">{date}</p>
      <p className="article-description">{shortDescription}</p>
      <Link href={`/blog/${id}?title=${title}&description=${shortDescription}`} className="read-more">Citeste mai mult</Link>
    </div>
  );
}

export default ArticleCard;
