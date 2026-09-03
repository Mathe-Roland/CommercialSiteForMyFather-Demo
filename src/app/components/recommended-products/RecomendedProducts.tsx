"use client";

import "./RecomendedProducts.css";
import ProdusCard from "../card-produse/ProdusCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchRecommendedProducts } from "../asyncOperations/fetch/fetchAllFields";

const RecommendedProducts = ({ category }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!category) return;

    const getProducts = async () => {
      try {
        const data = await fetchRecommendedProducts(category);

        console.log("Recommended products data:", data);

        setProducts(data);
      } catch (error) {
        console.error("Error fetching recommended products:", error);
      }
    };

    getProducts();
  }, [category]);

  if (!category) {
    return null;
  }

  return (
    <div className="recommended-products-container">
      <h3>Produse recomandate</h3>

      <hr />

      <Link
        href={`/magazin/${category?.toLowerCase().split(" ").join("-")}`}
        className="linking-back-to-category"
      >
        Descoperă și celelalte modele de {category} din MDF disponibile în
        categoria noastră.
      </Link>

      <div className="recommended-products-list">
        {products.map((product) => (
          <ProdusCard
            key={product.id}
            image={product?.attributes?.image?.data?.[0]?.attributes?.url}
            title={product.attributes?.title}
            description={product.attributes?.description}
            price={product.attributes?.price}
            id={product.id}
            priority={false}
            disponibil={
              product.attributes?.disponibil || "Produs Disponibil"
            }
          />
        ))}
      </div>
    </div>
  );
};


export default RecommendedProducts;