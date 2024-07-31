import "./acasa.css"
import { accordion } from "../../card-produse/cardList";
import  Link  from "next/link"; // Use next/link instead of react-router-dom
import Image from "next/image";

const Acasa=()=>{


    return (

        <div className="heightvh">
            {accordion.map((e,index)=>(
                <div key={index} className="acasa">
                <Link className="acasa-link" href={`/${e}`}>
                <h3 >{e.split("-").join(" ")}</h3>
               
                </Link>
                <div className="acasa">
                <Image className="acasa-ih" alt="failed to load" src={""} width={24} height={24}/>
                <Image className="acasa-ih" alt="failed to load" src={""} width={24} height={24}/>
                <Image className="acasa-ih" alt="failed to load" src={""} width={24} height={24}/>
                </div>

                </div>

            ))}

        </div>
    )
}

export default Acasa;