'use client';

import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Link from 'next/link'; // Use next/link for navigation in Next.js
import './navbar.css';
import Acasa from './navbarComponents/acasa';

export const navbarData = {
  items: ["Acasa", "Magazin", "Blog", "Despre Noi", "Contact"]
};

const Navbar = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [showAcasa, setShowAcasa] = useState(false);

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
      <div className="navbar-centered">
        <div className="navbar-contents">
          {navbarData.items.map((element, index) => (
            <div 
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
                  {index===1 ? 
                  <p className='navbar-text'>
                    {element}
                  </p>
                  
                :
                   <p className='navbar-text'>
                <Link href={element === "Acasa" ? "/" : generateUrl(element) || "/"}>
                  {element}
                </Link>
              </p>}             
              {showAcasa && index===1? (
                <div 
                  className="width100"
                >
                  <Acasa />
                </div>
              ):null}
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
            <MenuItem component="a" href="/" value="Acasa">
              Acasa
            </MenuItem>
            <MenuItem component="a" href="/despre-noi" value="Despre Noi">
              Despre Noi
            </MenuItem>
            <MenuItem component="a" href="/blog" value="Blog">
              Blog
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default Navbar;
