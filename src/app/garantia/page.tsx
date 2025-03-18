import FooterPages from "../components/footer-pages/FooterPages";
import { Metadata } from 'next';


export const metadata:Metadata = {
    title: 'Garanția',
    description: `La MOSTRIK DREAMLAND, 
    suntem dedicați să oferim produse de înaltă calitate, susținute de o garanție solidă. Descoperă politica noastră de garanție, 
    termenele de acoperire și pașii necesari pentru a beneficia de aceasta.`,
  };
  

const Garantia=()=>{

    const paragraphs=`Garanția Produselor

        La Decorcut.com, ne angajăm să vă oferim produse de înaltă calitate, fabricate cu grijă și atenție la detalii. Toate produsele noastre beneficiază de o garanție de 24 de luni, conform legislației în vigoare, pentru defecte de material sau de fabricație.

        Condițiile Garanției:
        - Garanția acoperă doar defectele de fabricație și materialele defecte.
        - Garanția nu acoperă deteriorările cauzate de utilizarea necorespunzătoare, manipularea neadecvată, expunerea la condiții extreme sau uzura normală a produsului.
        - În cazul în care întâmpinați probleme cu un produs achiziționat, vă rugăm să ne contactați printr-unul din mijloacele disponibile pe site-ul nostru. Veți fi ghidat prin pașii necesari pentru a depune o reclamație.
        
        Pașii pentru a beneficia de garanție:
        1. Contactați-ne: Informați-ne despre problema întâmpinată prin intermediul formularului de contact de pe site sau la adresa de e-mail specificată.
        2. Evaluarea produsului: După ce primim reclamația dvs., echipa noastră va evalua produsul și va decide dacă defectul intră sub incidența garanției.
        3. Reparație sau înlocuire: Dacă defectul este acoperit de garanție, produsul va fi reparat sau înlocuit fără costuri suplimentare pentru dvs.

        Excepții:
        - Produsele personalizate sau realizate la comandă nu sunt acoperite de garanția standard, exceptând defectele de fabricație evidente.
        - Orice modificare a produsului după achiziție anulează garanția.

        Pentru mai multe detalii despre politica de garanție sau pentru a solicita asistență, vă rugăm să ne contactați. Ne dorim ca experiența dvs. cu Decorcut să fie una pozitivă și să vă bucurați de produsele noastre pentru o lungă perioadă de timp!
`;


    return(<div>
        <FooterPages
        description={paragraphs}/>
        
    </div>);

}


export default Garantia;