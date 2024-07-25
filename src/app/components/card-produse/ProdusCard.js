import "./ProdusCard.css";
import Button from '@mui/material/Button';
import Link from "next/link";
import Cookies from 'js-cookie';
import Image from 'next/image';
import { cloudinaryTransformation } from "../functions/regexconversion";

const ProdusCard = ({ description, title, image, disponibil, price }) => {

  const handleData = () => {
    Cookies.set("description", description, { expires: 1 });
    Cookies.set("title", title, { expires: 1 });
    Cookies.set("image", image, { expires: 1 });
    Cookies.set("price", price, { expires: 1 });
  };

  // Define the image width and height for the responsive layout
  const imageWidth = 500;
  const imageHeight = 500;

  // Create URLs with different sizes for responsive images
  const imageUrl = cloudinaryTransformation(image, imageWidth, imageHeight);

  // Define the specific image URL that requires priority
  const specificImageUrl = "https://res.cloudinary.com/ddrkdrrre/image/upload/f_auto,w_500,h_500/szobasfafeketer_adfc03d26d.png";

  // Determine if this image should be prioritized
  const isPriority = imageUrl === specificImageUrl;

  return (
    <div className="financing-programmes-card-container" suppressHydrationWarning>
      <Image
        src={imageUrl}
        alt="Product"
        width={imageWidth}
        height={imageHeight}
        layout="responsive"
        sizes="(min-width: 600px) 450px, 352px"
        className="produscard-image"
        priority={isPriority} // Apply priority if the image matches the specific URL
      />
      <div className="financing-programmes-card-content">
        <h2 className="title-financing-programmes">{title}</h2>
        <div className="financing-program-card-description">{description}</div>
        <div className="red-pret"><p>{price}</p></div>
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
