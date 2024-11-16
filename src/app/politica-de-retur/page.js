import FooterPages from "../components/footer-pages/FooterPages";

export const metadata = {
    title: 'Politica de retur | MOSTRIK DREAMLAND',
    description: `La MOSTRIK DREAMLAND, înțelegem cât de importantă este satisfacția ta.
     Politica noastră de retur este simplă și transparentă,
     oferindu-ți opțiuni flexibile pentru schimb sau rambursare. Descoperă cum poți returna produsele ușor, pentru o experiență de cumpărături fără riscuri.`,
  };

const PoliticaDeRetur=()=>{

    const paragraphs=`         Politica de Retur - Decorcut.com
        

**Dreptul consumatorilor de denunțare unilaterală a contractului**



La Decorcut.com, ne asigurăm că produsele noastre respectă cele mai înalte standarde de calitate. Totuși, în cazul în care nu sunteți complet mulțumit de achiziția dvs., aveți dreptul să returnați produsele comandate.



**1. Dreptul de Retragere**
Conform Ordonanței Guvernului nr. 34/2014, consumatorii au dreptul de a se retrage din contract, fără a specifica un motiv, în termen de 14 zile calendaristice de la data la care ați intrat în posesia fizică a produselor. Pentru a vă exercita dreptul de retragere, trebuie să ne notificați printr-o declarație clară, trimisă prin una din metodele de comunicare disponibile pe site-ul nostru, Decorcut.com.


**2. Modalitatea de Returnare**
Pentru a returna un produs, vă rugăm să urmați pașii de mai jos:
- Informați-ne despre intenția dvs. de retragere completând formularul de retur disponibil pe site-ul nostru. În acest formular, includeți denumirea produsului, numărul comenzii, datele de facturare și contul bancar în care doriți să primiți contravaloarea produsului returnat.
- Returnați produsele în ambalajul original, împreună cu toate accesoriile și documentele primite, asigurându-vă că produsele nu prezintă urme de deteriorare sau uzură.
- Costurile de transport pentru returnarea produselor sunt suportate de către consumator, cu excepția cazului în care Decorcut.com acceptă să le acopere.


**3. Condiții de Returnare**
- Produsele trebuie să fie returnate în aceeași stare în care au fost livrate. Orice deteriorare a produsului poate atrage după sine o diminuare a valorii returnate, conform prevederilor legale.
- Contravaloarea produselor returnate va fi rambursată în contul bancar indicat de consumator în termen de maxim 14 zile de la recepționarea produselor de către Decorcut.com.
- **Important:** Produsele personalizate nu pot fi returnate conform OUG 34/2014, art. 16, lit. c.

**4. Excepții de la Dreptul de Retragere**
Sunt exceptate de la dreptul de retragere produsele care sunt confecționate după specificațiile prezentate de consumator sau care sunt personalizate în mod clar, conform legislației în vigoare.

**5. Returnarea Contravalorii**
Returnarea contravalorii produselor returnate se va face exclusiv în cont bancar. Nu se acceptă trimiterea coletelor retur cu “Ramburs”.

Pentru orice alte detalii sau clarificări, echipa Decorcut.com vă stă la dispoziție!`

    return(
        <FooterPages
        description={paragraphs}
        />
    );
};

export default PoliticaDeRetur;