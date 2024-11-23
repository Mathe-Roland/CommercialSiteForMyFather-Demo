
import './ArticleCard.css'; 
import  Link  from "next/link";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

interface ArticleProps{
  title:string,
  date:string,
  shortDescription:string,
  id:string
}

const ArticleCard = ({ title, date, shortDescription, id }:ArticleProps) => {
  return (
    <Card sx={{maxWidth: 545 ,margin:"1rem"}}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" className='article-title'>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} className='article-date'>
                  {date}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} className='article-description'>
                  {shortDescription}
          </Typography>
        <Link href={`/blog/${id}?title=${title}&description=${shortDescription}`} className="read-more">Citeste mai mult</Link>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ArticleCard;
