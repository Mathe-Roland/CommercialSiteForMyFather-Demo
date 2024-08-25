import "./Foot.css";
import Link from "next/link";

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
                            <Link href={"/termeni-si-conditii"}>
                            <li>Termeni si Conditii</li>
                            </Link>
                            <Link href={"/confidentialitate"}>
                            <li>Confidentialitate</li>
                            </Link>
                            <li>Metode de plata</li>
                        </ul>
                    </div>
                    <div className="footer-first-part-column">
                        <ul>
                            <Link href="./politica-de-cookie-uri">
                            <li>Politica de Cookie-uri</li>
                            </Link>
                            <li>Retur produse</li>
                            <li>Garantia produselor</li>
                            <li>Intrebari Frecvente</li>
                            <li>Online Dispute Resolution</li>
                        </ul>
                    </div>
                    <div className="footer-first-part-column">
                        <ul>
                            <Link href={"https://anpc.ro/"}>
                            <li>ANPC</li>
                            
                            </Link>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="footer-second-part">
                <h2>Informatii contact:</h2>
                <hr />
                <div className="footer-second-part-columns">
                    <p className="footer-email">
                        Adresa de e-mail: <span>Mostrik.dreamland@gmail.com</span>
                    </p>
                    <p className="footer-phone">
                        Numar de telefon: <span>0770 803 858</span>
                    </p>
                </div>
            </section>
        </footer>
    );
};

export default Footer;