import ArticlesClient from "./ArticlesClient";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Blog | DecorCut",
  description:
    "Descoperă articole și informații despre panouri traforate, MDF și decorațiuni interioare.",
  alternates: {
    canonical: "https://www.decorcut.ro/blog",
  },
};


const Articles = () => {
    

    return (<ArticlesClient/>);
};

export default Articles;