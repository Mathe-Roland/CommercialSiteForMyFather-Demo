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

  

  const specificImageUrl = "https://res.cloudinary.com/ddrkdrrre/image/upload/f_auto,w_500,h_500/evatai100_szobanatur_0d1839423a.png";

  const isPriority = image === specificImageUrl;



  return (
    <div className="financing-programmes-card-container" suppressHydrationWarning>
      <Image
        src={image}
        alt="Panou decorativ Mos138n"
        width={500}
        height={500}
        layout="responsive"
        sizes="(min-width: 600px) 450px, 352px"
        className="produscard-image"
        priority={title==="Panou decorativ Mos138n"?true:isPriority}
      />
      <div className="financing-programmes-card-content">
        <h2 className="title-financing-programmes">{title}</h2>
        <div className="financing-program-card-description">{description}</div>
        <div className="red-pret"><p>{price} RON</p></div>
        <div className="financing-program-card-startDate"><p>{disponibil}</p></div>
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
