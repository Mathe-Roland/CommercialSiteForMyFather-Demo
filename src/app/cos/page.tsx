import Cos from "./Cos";
import { Metadata } from 'next';


export const metadata:Metadata = {
  title: "Cos cumpărături",
  description: `Verifică și gestionează produsele din coșul tău de cumpărături la MOSTRIK DREAMLAND. Simplu și rapid, ai acces la detalii despre produse, cantități și total. Finalizează comanda și bucură-te de produse personalizate de calitate din MDF și lemn.`,
};

const CosPage = () => {
 
 

  return (<Cos/>);
}

export default CosPage;