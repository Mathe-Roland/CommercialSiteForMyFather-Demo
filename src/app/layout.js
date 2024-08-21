import './layout.css';
import './globals.css';
const Header = React.lazy(() => import('./components/header/Header'));
const Footer = React.lazy(() => import('./components/footer/Footer'));
const Navbar = React.lazy(() => import('./components/navbar/navbar'));

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
