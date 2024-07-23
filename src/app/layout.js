import './layout.css';
import { Inter } from 'next/font/google';
import './globals.css';
import Foot from './components/footer/Foot';
import Header from './components/header/Header';
import Navbar from './components/navbar/navbar';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content="Produse traforate vopsite sau nevopsite din lemn, personalizate" />
        <title>Produse traforate personalizate</title>
      </head>
      <body className={`height ${inter.className}`}>
        <Header />
        <Navbar />
        <main>{children}</main>
        <Foot />
      </body>
    </html>
  );
}
