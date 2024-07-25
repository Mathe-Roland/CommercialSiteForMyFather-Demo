import './layout.css';
import { Inter } from 'next/font/google';
import './globals.css';
import Foot from './components/footer/Foot';
import Header from './components/header/Header';
import Navbar from './components/navbar/navbar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Produse traforate personalizate</title>
        <meta name="description" content="Produse traforate vopsite sau nevopsite din lemn, personalizate" />
        <link rel='preload' fetchPriority='high' href='https://res.cloudinary.com/ddrkdrrre/image/upload/v1721761368/szobasfafeketer_adfc03d26d.png' as="image"></link>
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
