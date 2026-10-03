import "./DespreNoi.css";
import ImageGallery from "../components/imageGallery/ImageGallery";
import { fetchDataDespreNoiPage } from "../components/asyncOperations/fetch/fetchAllFields";
import { Metadata } from 'next';


export const metadata:Metadata={
     title : "Despre noi",
     description : `Descoperă povestea Decorcut și pasiunea noastră pentru produse decorative MDF personalizate, realizate cu atenție la detalii și calitate.`
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
