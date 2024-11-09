import './layout.css';
import './globals.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Navbar from './components/navbar/navbar';
import Cookies from 'js-cookie';
import ShowCookiesModal from './components/cookies/Cookies';
import { headers } from 'next/headers';


export default async function RootLayout({ children}) {

    const headersList = headers();
    const domain = headersList.get('host') || "";
    const fullUrl = headersList.get('referer') || "";


    let title = fullUrl.match(/title=([^&]+)/);

    let description = fullUrl.match(/description=([^&]+)/);

    
  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <meta name="description" content={decodeURIComponent(description[1])} />
      </head>
      <body>
        <Header />
        <Navbar />
        <main>{children}</main>
        <Footer />
        {typeof window !== 'undefined' && !Cookies.get("showModal") && <ShowCookiesModal />}
      </body>
    </html>
  );
}
