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
                <div className="acasa-pictures">
                    <img className="smallCatPicture" src="https://viralcats.net/blog/wp-content/uploads/2020/02/Relaxed-by-Ionut-Donici.jpg"/>
                    <img className="smallCatPicture" src="https://viralcats.net/blog/wp-content/uploads/2020/02/Relaxed-by-Ionut-Donici.jpg"/>
                    <img className="smallCatPicture" src="https://viralcats.net/blog/wp-content/uploads/2020/02/Relaxed-by-Ionut-Donici.jpg"/>
                </div>

                </div>

            ))}

        </div>
    )
}

export default Acasa;