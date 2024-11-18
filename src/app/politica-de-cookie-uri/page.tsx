import FooterPages from "../components/footer-pages/FooterPages";
import { Metadata } from 'next';


export const metadata:Metadata = {
    title: 'Politica de cookiuri | MOSTRIK DREAMLAND',
    description: `Politica de cookie-uri a MOSTRIK DREAMLAND îți oferă informații clare despre tipurile de cookie-uri utilizate, 
    scopurile acestora și cum contribuie la o experiență personalizată. 
    Află cum poți controla și gestiona setările cookie-urilor pentru confidențialitatea și preferințele tale`,
  };

const PoliticaCookies=()=>{

        const paragraphs=`Politica de Cookie-uri

        

La decorcut.com, utilizăm cookie-uri pentru a asigura funcționarea optimă a site-ului, pentru a îmbunătăți experiența utilizatorilor și pentru a oferi conținut și reclame personalizate. Această politică de cookie-uri explică ce sunt cookie-urile, ce tipuri de cookie-uri folosim, și cum poți gestiona preferințele tale legate de cookie-uri.
        
 Ce sunt cookie-urile?
Cookie-urile sunt fișiere mici de text care sunt stocate pe dispozitivul tău atunci când vizitezi un site web. Acestea permit site-ului să recunoască dispozitivul tău și să-ți ofere o experiență personalizată la fiecare vizită.
        
 Tipuri de cookie-uri utilizate
        
1. **Cookie-uri esențiale**: Aceste cookie-uri sunt necesare pentru ca site-ul să funcționeze corect. Fără aceste cookie-uri, site-ul nu ar putea să-ți ofere serviciile pe care le soliciți.
        
2. **Cookie-uri de performanță**: Aceste cookie-uri colectează informații despre cum utilizezi site-ul nostru, cum ar fi paginile pe care le vizitezi cel mai des și dacă primești mesaje de eroare. Aceste date ne ajută să îmbunătățim modul în care funcționează site-ul nostru.
        
3. **Cookie-uri de funcționalitate**: Aceste cookie-uri permit site-ului să-ți ofere funcționalități îmbunătățite și personalizate, cum ar fi reținerea preferințelor tale (de exemplu, limba sau regiunea ta).
        
4. **Cookie-uri de targetare și publicitate**: Aceste cookie-uri sunt utilizate pentru a afișa reclame relevante pentru tine și interesele tale. Ele pot fi, de asemenea, folosite pentru a limita numărul de ori când vezi o reclamă și pentru a măsura eficacitatea campaniilor publicitare.
        
 Perioada de stocare
Perioada de stocare a cookie-urilor poate varia. Unele cookie-uri sunt stocate doar pe durata sesiunii tale de navigare, în timp ce altele pot rămâne pe dispozitivul tău pentru o perioadă mai lungă.
        
 Gestionarea preferințelor de cookie-uri
Ai posibilitatea de a gestiona și controla cookie-urile prin setările browserului tău. Poți alege să blochezi sau să ștergi cookie-urile, însă te rugăm să reții că acest lucru poate afecta funcționalitatea site-ului nostru. Mai jos sunt câteva instrucțiuni generale:
        
- **Google Chrome**: Mergi la Setări  Confidențialitate și securitate  Setări site  Cookie-uri și datele site-urilor.
- **Mozilla Firefox**: Mergi la Opțiuni  Confidențialitate și securitate  Cookie-uri și date de site.
- **Microsoft Edge**: Mergi la Setări  Confidențialitate și servicii  Cookie-uri și permisiuni site-uri.
        
Pentru mai multe detalii despre cum să gestionezi cookie-urile, poți vizita site-ul oficial al browserului pe care îl utilizezi.
        
 Cookie-uri de la terțe părți
Anumite cookie-uri pot fi plasate de terțe părți, cum ar fi partenerii noștri de publicitate. Aceste cookie-uri colectează informații pentru a îți oferi reclame personalizate și pentru a analiza eficacitatea campaniilor publicitare.
        
 Contact
Dacă ai întrebări sau dorești mai multe informații despre utilizarea cookie-urilor pe decorcut.com, ne poți contacta la info@decorcut.com sau poți consulta Politica noastră de confidențialitate.

---`

    return(<FooterPages
    description={paragraphs}
    />)
}

export default PoliticaCookies;