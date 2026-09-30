// src/app/layout.tsx
import './layout.css';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/navbar';
import Header from './components/header/Header';
import CookiesConsentModal from './components/cookies/CookieConsentModals';
import ConsentScripts from './components/consent-scripts/ConsentScripts';
import { ReduxProvider } from '../redux/Provider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import type { Metadata } from 'next';


export const metadata: Metadata = {
  metadataBase: new URL('https://www.decorcut.ro'),

  title: {
    default: 'Produse decorative pentru interior | Decorcut',
    template: '%s | Decorcut',
  },

  description:
    'Descoperă produse decorative pentru amenajarea interioarelor, de la panouri MDF și măști de calorifer până la alte soluții decorative. Design modern și finisaje de calitate.',

  openGraph: {
    type: 'website',
    locale: 'ro_RO',
    siteName: 'Decorcut',
    title: 'Produse decorative pentru interior | Decorcut',
    description:
      'Descoperă produse decorative pentru amenajarea interioarelor, de la panouri MDF și măști de calorifer până la alte soluții decorative.',
    url: '/',
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <body>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_S_CLIENT_ID!}
          >

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
