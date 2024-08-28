import './layout.css';
import './globals.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Navbar from './components/navbar/navbar';
import Cookies from 'js-cookie';
import ShowCookiesModal from './components/cookies/Cookies';


export default function RootLayout({ children }) {
    
        if (typeof window !== 'undefined') {
            const stripeScript = document.createElement('script');
            stripeScript.src = 'https://js.stripe.com/v3/';
            stripeScript.defer = true;
            document.head.appendChild(stripeScript);

        }
    
    return (
        <html lang="en">
            <head>
                <title>panou decorative mdf traforat</title>
                <meta name="description" content="Produse traforate vopsite sau nevopsite din lemn, personalizate" />
                <link rel="dns-prefetch" href="https://js.stripe.com/"/>             
            </head>
            <body className={`height`}>
                <Header />
                <Navbar />
                <main>{children}</main>
                <Footer />
                {typeof window !== 'undefined' ? !Cookies.get("showModal") ? <ShowCookiesModal /> : null :null}
            </body>
        </html>
    );
};
