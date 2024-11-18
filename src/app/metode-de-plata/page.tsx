import FooterPages from "../components/footer-pages/FooterPages";
import { Metadata } from 'next';


export const metadata:Metadata = {
    title: 'Metode de plata | MOSTRIK DREAMLAND',
    description: `La MOSTRIK DREAMLAND
, îți punem la dispoziție multiple metode de plată sigure și rapide, adaptate nevoilor tale.
     Alege dintr-o varietate de opțiuni, inclusiv plăți online cu card bancar, transfer bancar, și alte metode populare.
     Îți garantăm o experiență de plată fără probleme, cu opțiuni flexibile și securitate ridicată, pentru ca tu să te bucuri de cumpărături în siguranță.`,
  };


const MetodeDeplata=()=>{


    const paragraphs=`Metode de plată - Decorcut.com

La Decorcut.com, dorim să îți oferim o experiență de cumpărare cât mai simplă și sigură. De aceea, punem la dispoziție mai multe metode de plată, pentru ca tu să poți alege varianta care ți se potrivește cel mai bine:

- **Plata cu cardul**: Poți efectua plata în siguranță utilizând cardul tău de credit sau debit. Tranzacțiile sunt procesate prin intermediul unui sistem securizat, astfel încât datele tale personale și bancare să fie protejate.

- **Plata ramburs**: Dacă preferi, poți opta pentru plata ramburs la primirea coletului. Acest serviciu îți permite să plătești direct curierului în momentul în care comanda ajunge la tine.

Indiferent de metoda de plată aleasă, la Decorcut.com te asigurăm că tranzacțiile tale vor fi realizate în condiții de siguranță maximă, iar produsele comandate vor ajunge la tine rapid și în cele mai bune condiții.
`

    return(<FooterPages
    description={paragraphs}
    />)
};

export default MetodeDeplata;