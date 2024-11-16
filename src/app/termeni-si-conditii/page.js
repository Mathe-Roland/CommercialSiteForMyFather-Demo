import FooterPages from "../components/footer-pages/FooterPages";

export const metadata = {
    title: 'Termeni si conditii | MOSTRIK DREAMLAND',
    description: `Descoperiți o gamă largă de produse traforate din lemn si mdf, 
            fiecare piesă fiind realizată cu atenție la detalii și o pasiune pentru design. 
            De la panouri decorative care adaugă un aer sofisticat oricărei încăperi, 
            la masti de calorifer, fiecare produs reflectă măiestria artizanală și durabilitatea lemnului de cea mai înaltă calitate.`,
  };

const Termeni=()=>{

    const paragraphs=`Termeni și Condiții


Bine ați venit pe decorcut.com! Acești Termeni și Condiții reglementează utilizarea site-ului nostru. Prin accesarea și utilizarea decorcut.com, sunteți de acord cu respectarea acestor termeni. Vă rugăm să citiți cu atenție aceste condiții înainte de a utiliza site-ul.
 1. Definiții
- **„Site”** se referă la decorcut.com.
- **„Utilizator”** se referă la orice persoană care accesează sau utilizează site-ul.
- **„Noi” sau „Operatorul”** se referă la decorcut.com și la echipa din spatele site-ului.

 2. Utilizarea site-ului
Site-ul decorcut.com poate fi utilizat doar în scopuri legale și personale. Este interzisă utilizarea site-ului într-un mod care ar putea aduce prejudicii site-ului, companiei sau altor utilizatori.

 3. Conturi de utilizator
Pentru a beneficia de anumite servicii, este posibil să fie necesar să creați un cont de utilizator. Sunteți responsabil pentru menținerea confidențialității informațiilor contului dvs. și pentru toate activitățile care au loc în contul dvs. Ne rezervăm dreptul de a suspenda sau închide contul dacă suspectăm orice activitate frauduloasă sau neautorizată.

 4. Comenzi și plăți
Prin plasarea unei comenzi pe site-ul nostru, sunteți de acord să achiziționați produsele respective la prețurile afișate. Ne rezervăm dreptul de a refuza sau anula orice comandă dacă produsul nu este disponibil, informațiile despre preț sunt incorecte sau dacă există alte probleme legate de comanda dvs.

Plățile sunt procesate prin metode securizate. Toate prețurile afișate pe site includ TVA, dacă nu este specificat altfel.

 5. Livrare
Facem tot posibilul pentru a livra comenzile la timp, dar nu suntem responsabili pentru întârzierile cauzate de curierat sau de alte circumstanțe neprevăzute. Costurile și termenii de livrare vor fi detaliate la finalizarea comenzii.

 6. Politica de returnare
Acceptăm returnarea produselor într-o perioadă de [număr de zile] zile de la data livrării, cu condiția ca produsele să fie în starea originală, neutilizate și în ambalajul original. Pentru a iniția o returnare, vă rugăm să ne contactați la [adresa de e-mail/contact]. Cheltuielile de returnare vor fi suportate de client, cu excepția cazurilor în care produsul este defect sau neconform.

 7. Proprietatea intelectuală
Conținutul site-ului, inclusiv texte, imagini, logo-uri și design, este protejat de drepturi de autor și alte drepturi de proprietate intelectuală. Este interzisă reproducerea, distribuirea sau utilizarea acestui conținut fără acordul nostru scris prealabil.

 8. Limitarea răspunderii
Decorcut.com nu va fi responsabil pentru nicio pierdere sau daună indirectă, incidentală sau consecventă, care rezultă din utilizarea sau imposibilitatea utilizării site-ului sau a produselor achiziționate de pe site.

 9. Modificări ale Termenilor și Condițiilor
Ne rezervăm dreptul de a modifica acești termeni și condiții în orice moment, fără o notificare prealabilă. Orice modificări vor fi publicate pe această pagină și vor intra în vigoare imediat după publicare. Este responsabilitatea utilizatorului să verifice periodic acești termeni.

 10. Legea aplicabilă
Acești Termeni și Condiții sunt guvernați de legile din România. Orice dispută va fi soluționată de instanțele competente din România.

 11. Contact
Pentru orice întrebări sau preocupări legate de acești Termeni și Condiții, ne puteți contacta la [adresa de e-mail/contact].
---

Aceasta este o versiune generală a Termenilor și Condițiilor pe care îi poți utiliza pe site-ul tău decorcut.com. Dacă ai nevoie de ajustări specifice, sunt aici să te ajut!
`

    return(<FooterPages
    description={paragraphs}
    />);
}

export default Termeni;