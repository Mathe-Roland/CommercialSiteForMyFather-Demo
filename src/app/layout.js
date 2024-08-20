import './layout.css';
import './globals.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Navbar from './components/navbar/navbar';

export default function RootLayout({ children }) {
    
    window.addEventListener('load', () => {
        const script = document.createElement('script');
        script.src = 'https://js.stripe.com/';
        script.async = true;
        document.head.appendChild(script);
      });
      

    return (
        <html lang="en">
            <head>
                <title>Produse traforate personalizate</title>
                <meta name="description" content="Produse traforate vopsite sau nevopsite din lemn, personalizate" />
                <link rel="preconnect" href="https://js.stripe.com"/>
                <link rel="dns-prefetch" href="https://js.stripe.com/"/>
            </head>
            <body className={`height`}>
                <Header />
                <Navbar />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
