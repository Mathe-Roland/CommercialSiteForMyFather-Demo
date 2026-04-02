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
  title: 'Panou mdf',
  description: `Panouri MDF decorative personalizate pentru interior. Design modern, finisaje de calitate și dimensiuni la comandă. Transformă-ți casa cu Decorcut.`,
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
