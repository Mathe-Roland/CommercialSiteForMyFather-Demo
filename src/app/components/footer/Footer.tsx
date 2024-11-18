import "./Foot.css";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="footer-container">
            <section className="footer-first-part">
                <div className="footer-first-part-columns">
                    <div className="footer-first-part-column">
                        <h3>MAGAZINUL MEU</h3>
                        <hr />
                        <Link href="/despre-noi">
                            <p>Despre noi</p>
                        </Link>
                        <Link href="/termeni-si-conditii">
                            <p>Termeni si Conditii</p>
                        </Link>
                        <Link href="/confidentialitate">
                            <p>Confidentialitate</p>
                        </Link>
                        <Link href="./metode-de-plata">
                            <p>Metode de plata</p>
                        </Link>
                        <Link href="./contact">
                            <p>Contact</p>
                        </Link>
                    </div>
                    <div className="footer-first-part-column">
                        <h3>CLIENTI</h3>
                        <hr />
                        <Link href="./politica-de-cookie-uri">
                            <p>Politica de Cookie-uri</p>
                        </Link>
                        <Link href="/politica-de-retur">
                            <p>Retur produse</p>
                        </Link>
                        <Link href="/garantia">
                            <p>Garantia produselor</p>
                        </Link>
                        <p>Intrebari Frecvente</p>
                        <p>Online Dispute Resolution</p>
                        <Link href="https://anpc.ro/">
                            <p>ANPC</p>
                        </Link>
                    </div>
                    <div className="footer-first-part-column">
                        <h3>DATE COMERCIALE</h3>
                        <hr />
                        <p>S.C. MOSTRIK DREAMLAND</p>
                        <p>J26-1096-2018</p>
                        <p>C.U.I. 39622807 </p>
                        <p>Sighisoara </p>
                        <p>Romania</p>
                    </div>
                </div>
            </section>

            <section className="footer-second-part">
                <h2>Informatii contact:</h2>
                <hr />
                <div className="footer-second-part-columns">
                    <p className="footer-email">
                        Adresa de e-mail: <span>mostrik.dreamland@gmail.com</span>
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
