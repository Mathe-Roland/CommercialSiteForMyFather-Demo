import "./DespreNoi.css";
import ImageGallery from "../components/imageGallery/ImageGallery";
import { fetchDataDespreNoiPage } from "../components/asyncOperations/fetchData";
import { Metadata } from 'next';


export const metadata:Metadata={
     title : "Despre noi | MOSTRIK DREAMLAND",
     description : `Descoperă povestea noastră și valorile care ne ghidează! Suntem o echipă dedicată, pasionată de 
    crea produse personalizate pentru utilizatori, cu ani de experiență în oferirea de produse personalizate din mdf si lemn. Află mai multe despre misiunea noastră,
     angajamentul față de clienți și de ce suntem alegerea potrivită pentru tine. Vino să ne cunoști!`
}

const DespreNoi = async () => {


        const fetchData = async () => {
            const data = await fetchDataDespreNoiPage();

                return data.data.data;
        };
        
        const ImageGalleryPictures=await fetchData() || null;


   
    if(!ImageGalleryPictures){


        return( <div className="loading-container">
            </div>)
        }

    return (
        <div className="despre-noi-container" suppressHydrationWarning>
            <div>
                <h1>Despre noi</h1>
                {ImageGalleryPictures ? 
                (<div className="despre-noi-contents">
                <ImageGallery images={ImageGalleryPictures[0]?.attributes?.image?.data} />
                    <div className="despre-noi-description"> 
                        {ImageGalleryPictures[0]?.attributes?.description?.split("\n\n")?.map((element,index) => (
                            <p key={index}>{element}</p>
                        ))}

                    </div>
                </div>)
                :
            (<div className="despre-noi-loading">
            </div>)    
            
            }
            </div>
        </div>
    );
};

export default DespreNoi;
