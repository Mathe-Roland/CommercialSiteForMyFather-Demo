import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

const getDomain = () => {
  const host = headers().get('host');
  return host?.includes('.com') ? 'https://www.decorcut.com' : 'https://www.decorcut.ro';
};

export async function GET() {
  const domain = getDomain();

  const robotsTxt = `User-agent: *
Disallow: /setari/informati-de-baza
Disallow: /garantia
Disallow: /cos
Disallow: /metode-de-plata
Disallow: /politica-de-cookie-uri
Disallow: /politica-de-retur
Disallow: /payment-success
Disallow: /termeni-si-conditii
Disallow: /contact
Disallow: /confidentialitate 

Allow: /

Sitemap: ${domain}/api/sitemap.xml`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
