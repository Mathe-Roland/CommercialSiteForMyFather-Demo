import "./acasa.css";
import { accordion } from "../../card-produse/cardList";
import  Link  from "next/link";
import Image from "next/image";


const Acasa=()=>{


    return (

        <div className="heightvh">
            {accordion.map((e,index)=>(
                
                <div key={index} className="acasa">
                <Link className="acasa-link" href={`/${Object.keys(e)[0]}`}>
                <h3 >{Object.keys(e)[0].split("-").join(" ")}</h3>
               
                </Link>

                <div className="acasa-pictures">
                    <img className="smallCatPicture" alt="newImage" src={e[Object.keys(e)[0]][0]||""}/>
                    <img className="smallCatPicture" alt="newImage" src={e[Object.keys(e)[0]][1]||""}/>
                    <img className="smallCatPicture" alt="newImage" src={e[Object.keys(e)[0]][2]||""}/>
                </div>
                </div>
            ))}

        </div>
    )
}

export default Acasa;