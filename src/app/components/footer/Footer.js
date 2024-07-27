import "./Foot.css";


const Footer = () => {
    return (
        <footer className="footer-container">
            <section className="footer-first-part">
                <h2>Link-uri rapide:</h2>
                <hr />
                <div className="footer-first-part-columns">
                    <div className="footer-first-part-column">
                        <ul>
                            <li>Despre noi</li>
                            <li>Termeni si Conditii</li>
                            <li>Confidentialitate</li>
                            <li>Metode de plata</li>
                        </ul>
                    </div>
                    <div className="footer-first-part-column">
                        <ul>
                            <li>Retur produse</li>
                            <li>Garantia produselor</li>
                            <li>Intrebari Frecvente</li>
                            <li>Online Dispute Resolution</li>
                        </ul>
                    </div>
                    <div className="footer-first-part-column">
                        <ul>
                            <li>ANPC</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="footer-second-part">
                <h2>Informatii contact:</h2>
                <hr />
                <div className="footer-second-part-columns">
                    <p className="footer-email">
                        Adresa de e-mail: <span className="black">@apusite@yahoo.com</span>
                    </p>
                    <p className="footer-phone">
                        Numar de telefon: <span className="black">@apusite@yahoo.com</span>
                    </p>
                </div>
            </section>

            <section className="footer-third-part">
                <h2>Link-uri rapide:</h2>
                <hr />
            </section>
        </footer>
    );
};

export default Footer;
