'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import Cookies from 'js-cookie';

const ConsentScripts = () => {
  const [shouldLoadGA, setShouldLoadGA] = useState(false);

  useEffect(() => {
    const consent = Cookies.get('consent');
    if (consent === 'all') {
      setShouldLoadGA(true);
    }
  }, []);

  return (
    <>
      {shouldLoadGA ? (
        <>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-2Q16GD6TDF"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-2Q16GD6TDF');
            `}
          </Script>
        </>
      )
      :
      null
      }
    </>
  );
};

export default ConsentScripts;
