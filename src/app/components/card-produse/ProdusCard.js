import "./ProdusCard.css";
import Button from '@mui/material/Button';
import Link from "next/link";
import Cookies from 'js-cookie';
import Image from 'next/image';

const ProdusCard = ({ description, title, image, disponibil, price }) => {
  const handleData = () => {
    Cookies.set("description", description, { expires: 1 });
    Cookies.set("title", title, { expires: 1 });
    Cookies.set("image", image, { expires: 1 });
    Cookies.set("price", price, { expires: 1 });
  };


  return (
    <div className="produs-container" suppressHydrationWarning>
      <div className="produs-image-container">

      <Image
        src={ image ? image : ""}
        alt={title? title :""}
        width={204}
        height={204}
        layout="responsive"
        sizes="(min-width: 600px) 450px, 352px"
        className="produs-image"
        priority={`${"Litere decorative Home" ? true:false}`}
      />

      </div>
      <div className="produs-content">
        <h2 className="title-produs">{title}</h2>
        <div className="produs-description">{description}</div>
        <div className="produs-pret"><p>{price} RON</p></div>
        <div className="produs-disponibil"><p>{disponibil}</p></div>
        <Link href={`/produse/${encodeURIComponent(title)}`}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleData}
            sx={{
              backgroundColor: "green",
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
