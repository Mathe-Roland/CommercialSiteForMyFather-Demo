import ArticlesClient from "./ArticlesClient";
import { Metadata } from 'next';


export const metadata:Metadata = {
    title: `Inovații și Sfaturi CNC | Proiecte, Tehnici și Idei`,
    description: `Descoperă lumea prelucrării CNC! Află sfaturi de la experți, 
    proiecte creative, informații despre tăierea cu laser și cele mai noi tendințe din industrie.`
};


const Articles = () => {
    

    return (<ArticlesClient/>);
};

export default Articles;