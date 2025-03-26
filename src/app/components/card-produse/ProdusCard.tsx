"use client";

import "./ProdusCard.css";
import Button from '@mui/material/Button';
import Link from "next/link";
import Cookies from 'js-cookie';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { useMediaQuery } from '@mui/material';
import Image from 'next/image';
import {formatForURL} from '../functions';
interface ProdusCardProps {
  description: string;
  title: string;
  image: string;
  disponibil: string;
  price: number;
  id: number;
}

const ProdusCard = ({ description, title, image, disponibil, price, id }: ProdusCardProps) => {

  const isMobile = useMediaQuery('(max-width:768px)');

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

  const isHighPriorityImage = 
    image === "https://res.cloudinary.com/ddrkdrrre/image/upload/v1732733779/Raft_suport_wifi_din_mdf_alb_1_kepavif_6fe4bc39a0.avif";

  return (
    <Card className='produscard-container' onClick={handleData}>
      <Link
        className="ignore"
        href={`/produse/${id}?title=${formatForURL(title)}`}
      >
        <CardActionArea>
          {isHighPriorityImage && isMobile ? (
            <Image
              className='produs-image'
              src={image}
              alt={title}
              width={180}
              height={180}
              priority 
              placeholder="blur"
              blurDataURL="/logosDecorcut.png"
            />
          ) : (
            <Image
              className="produs-image"
              src={image || "/logosDecorcut.png"}
              alt={title}
              height="180"
              width="180"
            />
          )}
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

            <Typography variant="body1"  className='produs-pret'>
              <strong>{price} RON</strong>
            </Typography>
            <Typography variant="body2" className='produs-disponibil'>
              {disponibil}
            </Typography>
          </CardContent>
          <Button
            variant="contained"
            color="primary"
            className="produs-button"
            >
            Vezi Detalii
          </Button>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default ProdusCard;