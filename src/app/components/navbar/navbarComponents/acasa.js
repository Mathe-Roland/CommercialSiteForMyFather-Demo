import "./acasa.css"
import { accordion } from "../../card-produse/cardList";
import  Link  from "next/link"; // Use next/link instead of react-router-dom
import Image from "next/image";

const Acasa=()=>{


    return (

        <div className="heightvh">
            {accordion.slice(1).map((e,index)=>(
                <div key={index} className="acasa">
                <Link className="acasa-link" href={`/${e}`}>
                <h3 >{e}</h3>
               
                </Link>
                <div className="acasa">
                <Image className="acasa-ih" alt="failed to load" src={"https://gomagcdn.ro/domains2/krista.ro/files/category/300x300/46.jpg"} loading="lazy"/>
                <Image className="acasa-ih" alt="failed to load" src={"https://gomagcdn.ro/domains2/krista.ro/files/category/300x300/46.jpg"} loading="lazy"/>
                <Image className="acasa-ih" alt="failed to load" src={"https://gomagcdn.ro/domains2/krista.ro/files/category/300x300/46.jpg"} loading="lazy"/>
                </div>

                </div>

            ))}

        </div>
    )
}

export default Acasa;