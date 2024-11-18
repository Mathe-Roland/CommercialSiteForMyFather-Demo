import "./ProdusCard.css";
import Button from '@mui/material/Button';
import Link from "next/link";
import Cookies from 'js-cookie';
import Image from 'next/image';

interface ProduscCardProps{
  description:string,
  title:string,
  image:string,
  disponibil:string,
  price:number
}

const ProdusCard = ({ description, title, image, disponibil, price }:ProduscCardProps) => {
  const handleData = () => {
    Cookies.set("description", description, {secure: true,
      sameSite: 'Strict',
      expires: 1,   
      path: '/', });
    Cookies.set("title", title, {secure: true,
      sameSite: 'Strict',
      expires: 1,   
      path: '/', });
    Cookies.set("image", image, { secure: true,
      sameSite: 'Strict',
      expires: 1,   
      path: '/', });
    Cookies.set("price", price, { secure: true,
      sameSite: 'Strict',
      expires: 1,   
      path: '/', });
  };


  return (
    <div className="produs-container" suppressHydrationWarning>
      <div className="produs-image-container">

    {"Panou decorativ Mos145"===title ? 
    <Image
      src={ image ? image : "/logosDecorcut.png"}
      alt={title ? title :"/logosDecorcut.png"}
      width={204}
      height={204}
      layout="responsive"
      sizes="(min-width: 600px) 450px, 352px"
      className="produs-image"
      priority={true}

    />
    :
      <Image
        src={ image ? image : "/logosDecorcut.png"}
        alt={title ? title :"/logosDecorcut.png"}
        width={204}
        height={204}
        layout="responsive"
        sizes="(min-width: 600px) 450px, 352px"
        className="produs-image"
      />
    }


      </div>
      <div className="produs-content">
        <h2 className="title-produs">{title}</h2>
        <div className="produs-description">{description}</div>
        <div className="produs-pret"><p> De la {price} RON</p></div>
        <div className="produs-disponibil"><p>{disponibil}</p></div>
        <Link className="ignore" 
        href={`/produse/panou-decorativ?title=${title.toLowerCase().split(" ").join("-")}&description=${description}`}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleData}
            sx={{
              backgroundColor: "green",
              textDecoration:"none",
              margin:"auto",
              display:"block",
              "&:hover": {
                backgroundColor: "red"
              }
            }}
          >
            Vezi Detalii
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProdusCard;
