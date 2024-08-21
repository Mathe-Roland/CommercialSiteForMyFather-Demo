import './layout.css';
import './globals.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Navbar from './components/navbar/navbar';
import Script from 'next/script';
import Head from 'next/head';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <Head>
                <title>Produse traforate personalizate</title>
                <meta name="description" content="Produse traforate vopsite sau nevopsite din lemn, personalizate" />
                <link rel="dns-prefetch" href="https://js.stripe.com" />
                <link rel="preload" href="https://www.decorcut.com/_next/static/css/a2504fd93a9ed98a.css" as="style" />
            </Head>
            <body className="height">
                <Header />
                <Navbar />
                <main>{children}</main>
                <Footer />
                
                <Script
                    src="https://js.stripe.com/v3/"
                    strategy="afterInteractive"
                />

                <Script
                    src="https://www.decorcut.com/_next/static/chunks/fd9d1056-3e5d3c630784c984.js"
                    strategy="lazyOnload"
                />
                <Script
                    src="https://www.decorcut.com/_next/static/chunks/7023-93c943c9116ac439.js"
                    strategy="lazyOnload"
                />
            </body>
        </html>
    );
}
