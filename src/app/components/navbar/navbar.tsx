'use client';

import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Link from 'next/link';
import './navbar.css';
import Acasa from './navbarComponents/acasa';

export const navbarData = {
  items: ["Acasa", "Magazin", "Blog", "Despre Noi", "Contact"],
};

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
                    {element === 'Acasa' ? (
                      <Link href={'/'}>
                        <p className='navbar-text'>{element}</p>
                      </Link>
                    ) : element === 'Magazin' ? (
                      <p className='navbar-text'>{element}</p>
                    ) : (
                      <p className='navbar-text'>
                        <Link href={generateUrl(element)}>{element}</Link>
                      </p>
                    )}
                    {showAcasa && index === 1 ? (
                      <div className='width100'>
                        <Acasa />
                      </div>
                    ) : null}
                  </div>
                ))
              : null}
          </div>
        </div>

        <div className='formControl'>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Select Option</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={selectedOption}
              onChange={handleChange}
            >
              {isMobile &&
                navbarData.items.map((e) => (
                  <Link href={e === 'Acasa' ? '/' : generateUrl(e)} passHref key={e}>
                    <MenuItem value={e}>{e}</MenuItem>
                  </Link>
                ))}
            </Select>
          </FormControl>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;