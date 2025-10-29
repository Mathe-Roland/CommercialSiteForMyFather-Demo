// src/app/layout.tsx
import './layout.css';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/navbar';
import Header from './components/header/Header';
import CookiesConsentModal from './components/cookies/CookieConsentModals';
import ConsentScripts from './components/consent-scripts/ConsentScripts';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ReduxProvider } from '../redux/Provider';

export const metadata = {
  title: 'panouri decorative mdf traforate',
  description: `Descoperiți o gamă largă de produse traforate din mdf, 
    fiecare piesă fiind realizată cu atenție la detalii și o pasiune pentru design. 
    De la panouri decorative care adaugă un aer sofisticat oricărei încăperi, 
    la masti de calorifer, fiecare produs reflectă măiestria artizanală și durabilitatea lemnului de cea mai înaltă calitate.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <body>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_S_CLIENT_ID!}>
          <ReduxProvider>
            <ConsentScripts />
            <Header />
            <Navbar />
            <main>{children}</main>
            <Footer />
            <CookiesConsentModal />
          </ReduxProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
