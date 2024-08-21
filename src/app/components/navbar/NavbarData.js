import React from 'react';
import Link from 'next/link';
import { Suspense, lazy } from 'react';

const Acasa = lazy(() => import('./navbarComponents/acasa'));

const NavbarData = ({ navbarData, generateUrl, handleMouseLeave, handleMouseEnter, showAcasa }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div>
      {navbarData.items.map((element, index) => (
        <div
          key={element}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          {element === "Acasa" ? (
            <Link href={"/"}>
              <p className='navbar-text'>
                {element}
              </p>
            </Link>
          ) : (element === "Magazin" ?
            <p className='navbar-text'>
              {element}
            </p>
            :
            <p className='navbar-text'>
              <Link href={generateUrl(element)}>
                {element}
              </Link>
            </p>
          )}
          {showAcasa && index === 1 && !isMobile ? (
            <Suspense fallback={<div>Loading...</div>}>
              <div className="width100">
                <Acasa />
              </div>
            </Suspense>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default NavbarData;
