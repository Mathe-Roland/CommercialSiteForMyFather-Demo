import "./acasa.css";
import { accordionCopy } from "../../card-produse/cardList";
import  Link  from "next/link";
import Image from "next/image";


const Acasa=()=>{


    return (

        <div className="heightvh">
            {accordionCopy.map((e,index)=>(
                index==0 || index===1 ?

                <div key={index} className="acasa">
                <Link className="acasa-link" href={`/${e}`}>
                <h3 >{e}</h3>
               
                </Link>
                </div>

                :

                <div key={index} className="acasa">
                <Link className="acasa-link" href={`/${Object.keys(e)}}`}>
                <h3 >{Object.keys(e)[0].split("-").join(" ")}</h3>
               
                </Link>

                <div className="acasa-pictures">
                    <img className="smallCatPicture" src={e[Object.keys(e)[0]][0]}/>
                    <img className="smallCatPicture" src={e[Object.keys(e)[0]][1]}/>
                    <img className="smallCatPicture" src={e[Object.keys(e)[0]][2]}/>
                </div>
                </div>
            ))}

        </div>
    )
}

export default Acasa;