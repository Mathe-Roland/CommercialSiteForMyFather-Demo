import FooterPages from "../components/footer-pages/FooterPages";

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