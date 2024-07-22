import './layout.css';
import { Inter } from "next/font/google";
import "./globals.css";
import Foot from './components/footer/Foot';
import Header from './components/header/Header';
import Navbar from './components/navbar/navbar';

const inter = Inter({ subsets: ["latin"] });


  


export default function RootLayout({ children }) {
  return (
    <html lang="en">

       <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="description" content="This is a description of my Next.js app" />
        <title>Panouri traforate</title>
      </head>

    <body className={`height ${inter.className}`}>
        <Header/>
        <Navbar/>
        <main>
          {children}
        </main>

        <Foot/>

      </body>
    </html>
  );
};
