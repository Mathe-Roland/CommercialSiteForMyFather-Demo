import * as React from 'react';
import "./ProdusCard.css";
import Button from '@mui/material/Button';
import Link from "next/link";
import Cookies from 'js-cookie';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

interface ProdusCardProps {
  description: string;
  title: string;
  image: string;
  disponibil: string;
  price: number;
  id:number
}

const ProdusCard = ({ description, title, image, disponibil, price ,id}: ProdusCardProps) => {
  const handleData = () => {
    Cookies.set("description", description, {
      secure: true,
      sameSite: 'Strict',
      expires: 1,
      path: '/',
    });
    Cookies.set("title", title, {
      secure: true,
      sameSite: 'Strict',
      expires: 1,
      path: '/',
    });
    Cookies.set("image", image, {
      secure: true,
      sameSite: 'Strict',
      expires: 1,
      path: '/',
    });
    Cookies.set("price", price.toString(), {
      secure: true,
      sameSite: 'Strict',
      expires: 1,
      path: '/',
    });
  };

  return (
    <Card sx={{ maxWidth: 545, margin: 'auto' ,padding:`1rem`}}>
       <Link
        className="ignore"
        href={`/produse/${id}?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`}
      >
 
        <CardActionArea>
          <CardMedia
            className='produs-image'
            component="img"
            height="180"
            width="180"
            image={image || "/logosDecorcut.png"}
            alt={title}
          />
          <CardContent>
          <Typography 
              gutterBottom 
              variant="h5" 
              component="div"
              className="title-produs"
            >
              {title}
            </Typography>

            <Typography
                variant="body2"
                className='produs-description'
              >
                {description}
            </Typography>

            <Typography variant="body1" sx={{ color: 'red' }} className='produs-pret'>
              <strong>{price} RON</strong>
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }} className='produs-disponibil'>
              {disponibil}
            </Typography>
          </CardContent>
          <Button
            variant="contained"
            color="primary"
            onClick={handleData}
            sx={{
              backgroundColor: "green",
              textDecoration: "none",
              margin: "auto",
              display: "block",
              "&:hover": {
                backgroundColor: "red",
              },
            }}
            >
            Vezi Detalii
          </Button>
        </CardActionArea>
    </Link>

    </Card>
  );
};

export default ProdusCard;
