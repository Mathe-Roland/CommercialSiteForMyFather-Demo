// layout.js (or RootLayout.js)
import './layout.css';
import { Inter } from "next/font/google";
import "./globals.css";
import Foot from './components/footer/Foot';
import Header from './components/header/Header';
import Navbar from './components/navbar/navbar';
import Head from 'next/head';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>Panouri traforate</title>
        <meta name="description" content="Panorui traforate" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body className={`height ${inter.className}`}>
        <Header />
        <Navbar />
        <main>
          {children}
        </main>
        <Foot />
      </body>
    </html>
  );
}
