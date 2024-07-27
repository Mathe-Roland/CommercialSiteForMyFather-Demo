import './layout.css';
import './globals.css';
import Foot from './components/footer/Foot';
import Header from './components/header/Header';
import Navbar from './components/navbar/navbar';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Produse traforate personalizate</title>
        <meta name="description" content="Produse traforate vopsite sau nevopsite din lemn, personalizate" />
      </head>
      <body className={`height`}>
        <Header />
        <Navbar />
        <main>{children}</main>
        <Foot />
      </body>
    </html>
  );
}
