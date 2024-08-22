import './layout.css';
import './globals.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Navbar from './components/navbar/navbar';

export default function RootLayout({ children }) {
    if (typeof window !== 'undefined') {


        // Add Stripe script
        const stripeScript = document.createElement('script');
        stripeScript.src = 'https://js.stripe.com/v3/';
        stripeScript.defer = true;
        document.head.appendChild(stripeScript);

        // Add other scripts
        const script1 = document.createElement('script');
        script1.src = 'https://www.decorcut.com/_next/static/chunks/fd9d1056-3e5d3c630784c984.js';
        script1.defer = true;
        document.head.appendChild(script1);

        const script2 = document.createElement('script');
        script2.src = 'https://www.decorcut.com/_next/static/chunks/7023-93c943c9116ac439.js';
        script2.defer = true;
        document.head.appendChild(script2);
    }

    return (
        <html lang="en">
            <head>
                <title>Produse traforate personalizate</title>
                <meta name="description" content="Produse traforate vopsite sau nevopsite din lemn, personalizate" />
                <link rel="dns-prefetch" href="https://js.stripe.com/"/>
                <noscript>
                <link rel="stylesheet" href="https://www.decorcut.com/_next/static/css/a2504fd93a9ed98a.css" />
                <link rel="stylesheet" href="https://www.decorcut.com/_next/static/css/bd5aa9cff39a6305.css" />
                <link rel="stylesheet" href="https://www.decorcut.com/_next/static/css/b2df370e7c0c4128.css" />
              </noscript>

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
