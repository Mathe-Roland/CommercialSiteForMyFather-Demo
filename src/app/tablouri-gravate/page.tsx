import { Metadata } from 'next';
import DespreNoiItems from "../components/despre-noi-items/DespreNoiItems";

export const metadata:Metadata = {
    title: 'tablouri gravate',
  };

const TablouriGravate=()=>{

    return(
        <DespreNoiItems/>
    );

}

export default TablouriGravate;