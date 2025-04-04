import './layout.css';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/navbar';
import Cookies from 'js-cookie';
import ShowCookiesModal from './components/cookies/Cookies';
import HeaderWithProvider from './components/header/Header';



export const metadata = {
    title: 'Panouri Decorative și Măști de Calorifer din mdf | Eleganță și Durabilitate',
    description: `Descoperiți o gamă largă de produse traforate din  mdf, 
            fiecare piesă fiind realizată cu atenție la detalii și o pasiune pentru design. 
            De la panouri decorative care adaugă un aer sofisticat oricărei încăperi, 
            la masti de calorifer, fiecare produs reflectă măiestria artizanală și durabilitatea lemnului de cea mai înaltă calitate.`,
  };
  
export default function RootLayout({ children }) {


  return (

    <html lang="ro">
      <head/>
      <body>
        
        <HeaderWithProvider />
        <Navbar />
        <main>{children}</main>
        <Footer />
        {typeof window !== 'undefined' && !Cookies.get("showModal") && <ShowCookiesModal />}
      </body>
    </html>
  );
}
