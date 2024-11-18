import ComenziPlasate from "./ComenziPlasate";
import { Metadata } from 'next';


export const metadata:Metadata = {
    title: `Cos de cumpărături | MOSTRIK DREAMLAND`,
    description: `Gestionează și finalizează comanda în coșul tău de cumpărături la MOSTRIK DREAMLAND.
     Revizuiește produsele alese, verifică detaliile și descoperă cât de simplu este să finalizezi achizițiile.
      Produse personalizate din MDF și lemn, perfecte pentru tine.`,
};

const ComenziPlasatePage=()=>{




    return (<ComenziPlasate/>)
}


export default ComenziPlasatePage;
