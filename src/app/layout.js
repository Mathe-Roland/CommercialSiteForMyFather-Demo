import './layout.css';
import './globals.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Navbar from './components/navbar/navbar';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Produse traforate personalizate</title>
        <meta name="description" content="Produse traforate vopsite sau nevopsite din lemn, personalizate" />
      </head>
      <body className="root-layout">
        <Header />
        <Navbar />
        <main className="content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
