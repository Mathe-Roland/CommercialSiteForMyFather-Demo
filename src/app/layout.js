import './layout.css';
import './globals.css';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/navbar';
const Header = React.lazy(() => import('./components/header/Header'));

export default function RootLayout({ children }) {
    
   
    return (
        <html lang="en">
            <head>
                <title>Produse traforate personalizate</title>
                <meta name="description" content="Produse traforate vopsite sau nevopsite din lemn, personalizate" />
                <script defer src="https://js.stripe.com/"></script>
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
