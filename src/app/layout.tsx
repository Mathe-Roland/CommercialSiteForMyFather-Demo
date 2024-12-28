import './layout.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Navbar from './components/navbar/navbar';
import Cookies from 'js-cookie';
import ShowCookiesModal from './components/cookies/Cookies';


export const metadata = {
    title: 'Mostrik Dreamland | Panouri Decorative | Panou ornamental | Panou MDF',
    description: `Descoperiți o gamă largă de produse traforate din lemn si mdf, 
            fiecare piesă fiind realizată cu atenție la detalii și o pasiune pentru design. 
            De la panouri decorative care adaugă un aer sofisticat oricărei încăperi, 
            la masti de calorifer, fiecare produs reflectă măiestria artizanală și durabilitatea lemnului de cea mai înaltă calitate.`,
  };
  
export default function RootLayout({ children }) {


  return (

    <html lang="ro">
      <head>
      <script defer src="https://js.stripe.com/v3/"></script>
      <script defer src="https://m.stripe.network/"></script>
      </head>
      <body>
        <Header />
        <Navbar />
        <main>{children}</main>
        <Footer />
        {typeof window !== 'undefined' && !Cookies.get("showModal") && <ShowCookiesModal />}
      </body>
    </html>
  );
}
