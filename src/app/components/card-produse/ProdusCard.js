import "./ProdusCard.css";
import Button from '@mui/material/Button';
import Link from "next/link";
import Cookies from 'js-cookie';


const ProdusCard = ({ description, title, image, disponibil, price }) => {

  const handleData = () => {
    Cookies.set("description", description, { expires: 1 });
    Cookies.set("title", title, { expires: 1 });
    Cookies.set("image", image, { expires: 1 });
    Cookies.set("price", price, { expires: 1 });
  };

  return (
    <div className="financing-programmes-card-container" suppressHydrationWarning>
      <img src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${image}`} alt="Product" className="produscard-image" />
      <div className="financing-programmes-card-content">
        <h2 className="title-financing-programmes">{title}</h2>
        <div className="financing-program-card-description">{description}</div>
        <div className="red-pret"><p>{price}</p></div>
        <div className="financing-program-card-startDate"><p>{disponibil}</p></div>
        <Link className="ignore" href={`/produse/${title}`}>
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
