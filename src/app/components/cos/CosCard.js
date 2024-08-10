import "./CosCard.css";
import { useState } from "react";
import { deleteProductData } from "../asyncOperations/fetchData";
import Image from 'next/image';


const CosCard = ({ id, image, title, price,quantityFromDatabase, addToCart }) => {
    const [counter, setCounter] = useState(quantityFromDatabase > 1 ? quantityFromDatabase : 1);

    const handleCounterChange = (e) => {
        const value = parseInt(e.target.value.trim());
        if (!isNaN(value)) {
            setCounter(value);
            const addToCartObject={
                id:id,
                image:image,
                title:title,
                price:price,
                count:value,
            }

            addToCart(addToCartObject);
        } else {
            setCounter('');
            const addToCartObject={
                id:id,
                image:image,
                title:title,
                price:price,
                count:0,
            }

            addToCart(addToCartObject);
           
        }
    };
    
    const handleCounter = (action) => {
        if (action === "decrement") {
            if (counter > 1) {
                const newCounter = counter - 1;
                const addToCartObject = {
                    id: id,
                    image: image,
                    title: title,
                    price: price,
                    count: newCounter,
                };
                addToCart(addToCartObject);
                setCounter(counter - 1);
            }
        } else if (action === "increment") {
            if (counter === "") {
                const newCounter = 1;
                setCounter(newCounter);
                const addToCartObject = {
                    id: id,
                    image: image,
                    title: title,
                    price: price,
                    count: newCounter,
                };
                addToCart(addToCartObject);
            } else {
                const newCounter = parseInt(counter) + 1;
                const addToCartObject = {
                    id: id,
                    image: image,
                    title: title,
                    price: price,
                    count: newCounter,
                };
                addToCart(addToCartObject);
                setCounter(newCounter);
            }
        }
    };
    

    const deleteItem = async () => {
        await deleteProductData(id);
        window.location.reload();
    }
    

    const publicImage="cancel.webp";

    return (
        <div className="coscard-container">
            <div className="coscard-image">
            <Image alt="produs-buyed" 
            width={120}
            height={120}
             className="cos-image" src={`${image  ?image :""}`} />
            </div>
            <div className="coscard-title">
                <h3>{title}</h3>
            </div>
            <p className="cantitate-pentru-increment-buttons">Cantitate</p>
            <div className="incremental-buttons">
                <button id="decrement" className="cos-descrement" onClick={() => handleCounter("decrement")}>-</button>
                <input type="text" id="counter" value={counter} onChange={handleCounterChange} className="cos-counter" />
                <button id="increment" onClick={() => handleCounter("increment")} className="cos-descrement">+</button>
            </div>
            <div className="price">
                <span className="prices"><span className="cantitate-pentru-increment-buttons">Pret</span> {price}</span>
            </div>
            <div className="cancel-icon">
                <Image 
                src={`${publicImage  ?"/cancel.webp" :""}`}
                className="cancel"
                onClick={deleteItem}
                height={24}
                width={24}/>
            </div>
        </div>

    );
}

export default CosCard;
