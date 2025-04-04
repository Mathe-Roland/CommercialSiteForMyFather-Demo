import "./CosCard.css";
import { useDispatch, useSelector } from "react-redux";
import { setQuantity, removeItem, addItem } from "../../../redux/cart";
import Image from "next/image";
import Cookies from "js-cookie";
import { deleteProductData } from "../asyncOperations/fetch-by-id/fetchBYId";
import { RootState } from "../../../redux/store";

const CosCard = ({ id, image, title, price, quantity }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart);
  

  const handleCounterChange = (e) => {
    const value = parseInt(e.target.value.trim());
    if (!isNaN(value) && value >= 0) {
      dispatch(setQuantity({ id:id, quantity: value }));
    }
  };

  const handleIncrement = () => {
    dispatch(setQuantity({ id:id, quantity: quantity + 1 }));
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      dispatch(setQuantity({ id:id, quantity: quantity - 1 }));
    }
  };

  const deleteItem = async () => {
    if (Cookies.get("user")) {
      await deleteProductData(id);
    }

    dispatch(removeItem(id));
    
  };

  return (
    <div className="coscard-container">
      <div className="coscard-image">
        <Image alt="produs-buyed" width={120} height={120} className="cos-image" src={image || ""} />
      </div>
      <div className="coscard-title">
        <h3>{title}</h3>
      </div>
      <p className="cantitate-pentru-increment-buttons">Cantitate</p>
      <div className="incremental-buttons">
        <button id="decrement" className="cos-descrement" onClick={handleDecrement}>
          -
        </button>
        <input type="text" id="counter" value={quantity} onChange={handleCounterChange} className="cos-counter" />
        <button id="increment" className="cos-descrement" onClick={handleIncrement}>
          +
        </button>
      </div>
      <div className="price">
        <span className="prices">
          <span className="cantitate-pentru-increment-buttons">Pret</span> {price}
        </span>
      </div>
      <div className="cancel-icon">
        <Image src="/cancel.webp" alt={title} className="cancel" onClick={deleteItem} height={24} width={24} />
      </div>
    </div>
  );
};

export default CosCard;
