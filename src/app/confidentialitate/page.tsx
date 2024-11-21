import FooterPages from "../components/footer-pages/FooterPages";
import { Metadata } from 'next';


export const metadata:Metadata = {
    title: 'Confidentialitate | MOSTRIK DREAMLAND',
    description: `La MOSTRIK DREAMLAND
, confidențialitatea ta este prioritatea noastră.
     Descoperă cum gestionăm informațiile tale personale, ce măsuri de securitate aplicăm și ce drepturi ai privind datele tale. 
    Politica noastră de confidențialitate este creată pentru a-ți oferi transparență și încredere.`,
  };


const PoliticaDeConfidentialitate=()=>{

    const paragraphs=`Politica de Confidențialitate

        
        
        
        
        
La decorcut.com, respectăm confidențialitatea datelor tale personale și ne angajăm să protejăm informațiile pe care ni le furnizezi. Această politică de confidențialitate descrie tipurile de date personale pe care le colectăm, cum le utilizăm și ce drepturi ai în legătură cu aceste date.



 1. Informații colectate
Putem colecta următoarele tipuri de informații:



- **Informații de contact**: numele, adresa de e-mail, numărul de telefon și adresa de livrare/facturare, atunci când plasezi o comandă sau completezi un formular de contact.


  
- **Informații despre utilizare**: date despre cum folosești site-ul nostru, inclusiv paginile vizitate, timpul petrecut pe site și interacțiunile cu conținutul nostru.


  
- **Informații financiare**: date de plată sau detalii ale tranzacțiilor atunci când efectuezi o achiziție.


  
- **Date tehnice**: adresa IP, tipul de browser, sistemul de operare și alte informații tehnice colectate automat atunci când accesezi site-ul.



 2. Scopurile prelucrării datelor
Folosim datele colectate pentru următoarele scopuri:



- **Procesarea comenzilor**: pentru a prelucra și livra comenzile plasate pe site-ul nostru.


  
- **Comunicare**: pentru a răspunde la întrebările și solicitările tale și pentru a-ți oferi suport tehnic sau informații despre produsele și serviciile noastre.


  
- **Marketing**: pentru a-ți trimite oferte, promoții și alte informații care ar putea fi de interes pentru tine, cu acordul tău prealabil.


  
- **Îmbunătățirea serviciilor**: pentru a analiza modul în care interacționezi cu site-ul nostru și a îmbunătăți experiența utilizatorilor.


  
- **Securitate**: pentru a proteja site-ul nostru și utilizatorii de activități frauduloase sau neautorizate.



 3. Partajarea datelor cu terți
Nu vom vinde, închiria sau partaja datele tale personale cu terți în scopuri comerciale fără acordul tău. Cu toate acestea, putem divulga datele tale următorilor destinatari:



- **Furnizori de servicii**: companii care ne ajută să furnizăm și să îmbunătățim serviciile noastre, cum ar fi procesatori de plăți, servicii de livrare, servicii de marketing și publicitate.


  
- **Autorități publice**: dacă este necesar să respectăm obligațiile legale sau să protejăm drepturile noastre, proprietatea sau siguranța noastră sau a altor persoane.



 4. Securitatea datelor
Luăm măsuri tehnice și organizatorice adecvate pentru a proteja datele personale împotriva accesului neautorizat, pierderii sau distrugerii. Cu toate acestea, nicio metodă de transmitere a datelor prin internet sau metodă de stocare electronică nu este complet sigură, astfel că nu putem garanta securitatea absolută a datelor tale.



5. Drepturile tale
Ai următoarele drepturi în legătură cu datele tale personale:



- **Dreptul de acces**: poți solicita detalii despre datele tale personale pe care le deținem.


  
- **Dreptul la rectificare**: poți cere corectarea datelor tale personale care sunt incorecte sau incomplete.


  
- **Dreptul la ștergere**: poți solicita ștergerea datelor tale personale în anumite circumstanțe.

  
- **Dreptul la restricționare**: poți solicita restricționarea prelucrării datelor tale personale în anumite situații.


  
- **Dreptul la portabilitatea datelor**: poți solicita transferul datelor tale personale către tine sau către un alt operator.


  
- **Dreptul de a te opune**: poți te opune prelucrării datelor tale personale în anumite circumstanțe, cum ar fi utilizarea lor în scopuri de marketing direct.



Pentru a-ți exercita aceste drepturi, te rugăm să ne contactezi la mostrik.dreamland@gmail.com.



 6. Modificări ale politicii de confidențialitate
Putem actualiza această politică de confidențialitate periodic pentru a reflecta modificările aduse practicilor noastre de confidențialitate. Orice modificare va fi publicată pe această pagină, iar în cazul unor modificări semnificative, te vom notifica prin e-mail sau printr-un mesaj pe site.



 7. Contact
Dacă ai întrebări sau nelămuriri cu privire la politica noastră de confidențialitate, ne poți contacta la mostrik.dreamland@gmail.com.



---

Aceasta este o politică de confidențialitate pe care o poți folosi pe site-ul tău decorcut.com. Dacă ai nevoie de alte ajustări sau adăugiri, te rog să-mi spui! 
`

    return(<FooterPages
    description={paragraphs}
    />)
}

export default PoliticaDeConfidentialitate;