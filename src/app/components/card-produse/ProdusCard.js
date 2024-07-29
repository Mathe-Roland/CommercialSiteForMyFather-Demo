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

  

  const priorityImage="Panou decorativ Live Laugh Love";

  const priority=priorityImage===title;

  return (
    <div className="produs-container" suppressHydrationWarning>
      <Image
        src={image}
        alt={`${title}`}
        width={500}
        height={500}
        layout="responsive"
        sizes="(min-width: 600px) 450px, 352px"
        className="produscard-image"
        priority={title==="Litere decorative Home"?true:priority}
      />
      <div className="produs-content">
        <h2 className="title-produs">{title}</h2>
        <div className="produs-description">{description}</div>
        <div className="red-pret"><p>{price} RON</p></div>
        <div className="produs-startDate"><p>{disponibil}</p></div>
        <Link className="ignore" href={`/produse/${encodeURIComponent(title)}`}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleData}
            sx={{
              backgroundColor: "green",
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
