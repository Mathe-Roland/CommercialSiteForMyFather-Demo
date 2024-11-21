import { Metadata } from 'next';
import DespreNoiItems from "../components/despre-noi-items/DespreNoiItems";

export const metadata:Metadata = {
    title: 'Cadouri personalizate | MOSTRIK DREAMLAND',
    description: `Descoperiți o gamă largă de produse traforate din lemn si mdf, 
            fiecare piesă fiind realizată cu atenție la detalii și o pasiune pentru design. 
            De la panouri decorative care adaugă un aer sofisticat oricărei încăperi, 
            la masti de calorifer, fiecare produs reflectă măiestria artizanală și durabilitatea lemnului de cea mai înaltă calitate.`,
  };

const CadouriPersonalizate=()=>{

   
    return (<DespreNoiItems/>);

}

export default CadouriPersonalizate;