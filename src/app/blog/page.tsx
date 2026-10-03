import ArticlesClient from "./ArticlesClient";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Blog",
  description:
    "Descoperă articole despre panouri MDF, panouri traforate, măști de calorifer și idei pentru amenajarea unui interior modern și elegant.",
  alternates: {
    canonical: "https://www.decorcut.ro/blog",
  },
};


const Articles = () => {
    

    return (<ArticlesClient/>);
};

export default Articles;