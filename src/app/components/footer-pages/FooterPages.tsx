import "./FooterPages.css";


const FooterPages=({description}:{description:string})=>{

    const paragraphs=description.split("\n\n");

    return(<div>
            <h2 className="footer-pages-titlu">{paragraphs[0]}</h2>
        <br></br>
        <br></br>
        <br></br>
        {
                paragraphs.slice(1,paragraphs.length).map((text)=>text.split("\n").map((text)=>(


                    <div>
    
                    <p className="footer-pages-description">
                        {text} 
                    </p>
                    <br></br>
                    </div>



                ))

            )

            } 

    </div>
    );

};



export default FooterPages;