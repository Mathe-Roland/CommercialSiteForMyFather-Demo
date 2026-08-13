'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './navbar.css';
import { useRouter } from "next/navigation";


export const navbarData = {
  items: ["Acasa", "Magazin", "Blog", "Despre Noi", "Contact"],
};

const magazinList={
  items:["Harti","Masca de calorifer","Pandative","Panouri decorative","Tablouri gravate","Cadouri personalizate"]
}

const Navbar = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isMobile, setIsMobile] = useState(false); 

  const [isPinned, setIsPinned] = useState(false);


  const router = useRouter();


  useEffect(() => {
    const sentinel = document.getElementById("navbar-sentinel");

    const observer = new IntersectionObserver(
      ([entry]) => {
      setIsPinned(!entry.isIntersecting);
    },
    { threshold: 0 }
  );

  if (sentinel) observer.observe(sentinel);

  return () => observer.disconnect();
}, []);


  useEffect(() => {
    const updateView = () => {
      setIsMobile(window.innerWidth < 680);
    };

    updateView();

    window.addEventListener('resize', updateView);

    return () => {
      window.removeEventListener('resize', updateView);
    };
  }, []);


  const generateUrl = (name) => {
    return name ? `/${name.toLowerCase().split(' ').join('-')}` : '/';
  };



  return (
    <header id='navbar-sentinel'>
      <nav className={`navbar ${isPinned ? "pinned" : ""}`}>
        <div className='navbar-centered'>
          <div className='navbar-contents'>
            {!isMobile
              ? navbarData.items.map((element) => (
                  <div
                    key={element}
                  >
                    <Link href={element==="Acasa"? "/" : generateUrl(element)}>
                      <p className='navbar-text'>{element}</p>
                    </Link>
                  </div>
                ))
              : null}
          </div>
        </div>
        <div className="formControl">
          {isMobile && (
            <select
              className="mobile-select"
              value={selectedOption}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedOption(value);

                if (value) {
                  router.push(value);
                }
              }}
            >
              <option value="">Selectează...</option>

              {navbarData.items
                .filter((item) => item !== "Magazin")
                .map((item) => (
                  <option
                    key={item}
                    value={item === "Acasa" ? "/" : generateUrl(item)}
                  >
                    {item}
                  </option>
                ))}

              <optgroup label="Magazin">
                {magazinList.items.map((item) => (
                  <option
                    key={item}
                    value={`/magazin${generateUrl(item)}`}
                  >
                    {item}
                  </option>
                ))}
              </optgroup>
            </select>
          )}
        </div>

      </nav>
    </header>
  );
};

export default Navbar;