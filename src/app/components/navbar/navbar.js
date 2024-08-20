'use client';

import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Link from 'next/link';
import Head from 'next/head'; // Import the Head component from Next.js
import Acasa from './navbarComponents/acasa';

export const navbarData = {
  items: ["Acasa", "Magazin", "Blog", "Despre Noi", "Contact"]
};

const Navbar = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [showAcasa, setShowAcasa] = useState(false);

  useEffect(() => {
    // Dynamically load the CSS after the component mounts
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './navbar.css';
    document.head.appendChild(link);
  }, []);

  const handleMouseEnter = (index) => {
    if (index === 1) {
      setShowAcasa(true);
    }
  };

  const handleMouseLeave = () => {
    setShowAcasa(false);
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const generateUrl = (name) => {
    return name ? `/${name.toLowerCase().split(" ").join("-")}` : "/";
  };

  return (
    <div className="navbar">
      <Head>
        {/* Preload the navbar CSS */}
        <link
          rel="preload"
          href="/path/to/your/navbar.css"
          as="style"
        />
      </Head>
      <div className="navbar-centered">
        <div className="navbar-contents">
          {navbarData.items.map((element,index) => (
            <div 
              key={element} 
              onMouseEnter={() => handleMouseEnter(navbarData.items.indexOf(element))}
              onMouseLeave={handleMouseLeave}
            >
              {element === "Acasa" ? (
                <Link href={"/"}>
                
                <p className='navbar-text'>
                  {element}
                </p>
                </Link>
                
              ) : (element==="Magazin"?
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
              {showAcasa && index === 1 ? (
                <div className="width100">
                  <Acasa />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
      <div className="formControl">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Option</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedOption}
            onChange={handleChange}
          >
            {navbarData.items.map((e,index) => (
              e !== "Acasa" ? (
                index===1?
                null
                :
                <MenuItem 
                  key={e} 
                  component="a" 
                  href={e.toLowerCase().split(" ").join("-")} 
                  value={e}
                >
                  {e}
                </MenuItem>
              ) : (<MenuItem 
                key={e} 
                component="a" 
                href={"/"} 
                value={e}
              >
                {e}
              </MenuItem>)
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default Navbar;
