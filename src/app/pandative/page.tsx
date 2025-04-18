import DespreNoiItems from "../components/despre-noi-items/DespreNoiItems";
import { Metadata } from 'next';


export const metadata:Metadata = {
    title: 'Pandative',
    description: `Descoperiți o gamă largă de produse traforate din lemn si mdf, 
            fiecare piesă fiind realizată cu atenție la detalii și o pasiune pentru design. 
            De la panouri decorative care adaugă un aer sofisticat oricărei încăperi, 
            la masti de calorifer, fiecare produs reflectă măiestria artizanală și durabilitatea lemnului de cea mai înaltă calitate.`,
  };


const Pandative=()=>{

    
    return (<DespreNoiItems/>)

}

export default Pandative;