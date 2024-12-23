import DespreNoiItems from "../components/despre-noi-items/DespreNoiItems";
import { Metadata } from 'next';


export const metadata:Metadata = {
    title: 'Magazin | MOSTRIK DREAMLAND',
    description: `Bine ai venit la MOSTRIK DREAMLAND! Descoperă o gamă variată de produse personalizate, realizate cu precizie și pasiune. 
    De la decorațiuni unice pentru casă până la cadouri speciale, magazinul nostru îți oferă articole de calitate create pentru a aduce 
    frumusețe și originalitate în viața ta. Explorează colecțiile noastre și transformă-ți ideile
    în realitate cu ajutorul designurilor noastre inovatoare.`,
  };


const Magazin=()=>{

    
    
    return (
        <DespreNoiItems/>
    )

}

export default Magazin;