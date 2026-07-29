import "./ProdusCard.css";
import Link from "next/link";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Image from 'next/image';
import {formatForURL} from '../functions';

interface ProdusCardProps {
  description: string;
  title: string;
  image: string;
  disponibil: string;
  price: number;
  id: number;
  priority?: boolean;
}

const ProdusCard = ({ description, title, image, disponibil, price, id ,priority}: ProdusCardProps) => {



  return (
    <Card className='produscard-container'>
      <Link
        className="ignore"
        href={`/produse/${id}-${formatForURL(title)}`}
      >
        <CardActionArea>
            <Image
              className="produs-image"
              src={image || "/logosDecorcut.png"}
              alt={title}
              height="180"
              width="180"
              priority={priority}
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

            <Typography variant="body1"  className='produs-pret'>
              <strong>{price} RON</strong>
            </Typography>
            <Typography variant="body2" className='produs-disponibil'>
              {disponibil}
            </Typography>
          </CardContent>
          <div role="button"
            className="produs-button"
            >
            Vezi Detalii
          </div>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default ProdusCard;