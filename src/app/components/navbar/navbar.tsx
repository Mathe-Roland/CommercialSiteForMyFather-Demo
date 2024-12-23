'use client';

import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Link from 'next/link';
import './navbar.css';

export const navbarData = {
  items: ["Acasa", "Magazin", "Blog", "Despre Noi", "Contact"],
};

const magazinList={
  items:["Harti","Masca de calorifer","Pandative","Panouri decorative","Tablouri decorative","Tablouri gravate",]
}

const Navbar = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [showAcasa, setShowAcasa] = useState(false);
  const [isMobile, setIsMobile] = useState(false); 

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
    return name ? `/${name.toLowerCase().split(' ').join('-')}` : '/';
  };

  return (
    <header className='navbar'>
      <nav>
        <div className='navbar-centered'>
          <div className='navbar-contents'>
            {!isMobile
              ? navbarData.items.map((element, index) => (
                  <div
                    key={element}
                    onMouseEnter={() => handleMouseEnter(navbarData.items.indexOf(element))}
                    onMouseLeave={handleMouseLeave}
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
          <FormControl fullWidth>
            <InputLabel id="main-select-label">Select Option</InputLabel>
          <Select
            labelId="main-select-label"
            id="main-select"
            value={selectedOption}
            onChange={handleChange}
          >
          {isMobile &&
            navbarData.items.map((e) => {
              if (e === "Magazin") {
                return (
                  <FormControl fullWidth key="magazin">
                    <InputLabel id="magazin-select-label">Magazin</InputLabel>
                    <Select
                      labelId="magazin-select-label"
                      id="magazin-select"
                      value={selectedOption}
                      onChange={handleChange}
                    >
                      {magazinList.items.map((item) => (
                      <Link href={generateUrl(item)} passHref>
                        <MenuItem value={item} key={item}>
                            {item}
                        </MenuItem>
                      </Link>
                      ))}
                    </Select>
                  </FormControl>
                );
              } else {
                return (
                  <Link href={e === "Acasa" ? "/" : generateUrl(e)} passHref>
                    <MenuItem value={e} key={e}>
                      {e}
                    </MenuItem>
                  </Link>
                );
              }
            })}
             </Select>
          </FormControl>
        </div>

      </nav>
    </header>
  );
};

export default Navbar;