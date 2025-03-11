export async function GET() {
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
  
  Sitemap: https://www.decorcut.com/sitemap.xml
  Sitemap: https://www.decorcut.ro/sitemap.xml
  `;
  
    return new Response(robotsTxt, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
  