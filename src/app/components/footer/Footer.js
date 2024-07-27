import "./Foot.css";

const Footer=()=>{



    return (
        <div className="footer-container">
            <div className="footer-first-part-container">
                <div className="footer-first-part">
                <p>Link-uri rapide:</p>
                <hr></hr>

                <div className="footer-first-part-columns">

                <div className="footer-first-part-column">
                <p>Despre noi</p>
                <p>Termeni si Conditii</p>
                <p>Confidentialitate</p>
                <p>Metode de plata</p>
                </div>

                <div className="footer-first-part-column">
                
                <p>Retur produse</p>
                <p>Garantia produselor</p>
                <p>Intrebari Frecvente</p>
                <p>Online Dispute Resolution</p>
                </div>
                <div className="footer-first-part-column none">
                <p>ANPC</p>

                </div>
                </div>
                
                </div>
            </div>
                <div className="footer-second-part">

                <p>Informatii contact:</p>
                <hr></hr>
                <div className="footer-second-part-columns">
                <p className="footer-email">Adresa de e-mail: <span className="black">@apusite@yahoo.com</span></p>
                <p className="footer-phone">Numar de telefon: <span className="black">@apusite@yahoo.com</span></p>
                    
                </div>

                </div>

                <div className="footer-third-part">
                <p>Link-uri rapide:</p>
                <hr></hr>
                
                </div>
        </div>

    )
}


export default Footer;
