import DespreNoiItems from "../components/despre-noi-items/DespreNoiItems";
import { Metadata } from 'next';


export const metadata:Metadata = {
    title: 'Magazin',
    description: `Descoperă produsele decorative Decorcut: panouri MDF, măști de calorifer și soluții elegante pentru amenajarea interioarelor.`,
    alternates: {
        canonical: 'https://www.decorcut.ro/magazin',
      },
  }


const Magazin=()=>{

    
    
    return (
        <DespreNoiItems params={{ categoryName: "Magazin" }} />
    )

}

export default Magazin;