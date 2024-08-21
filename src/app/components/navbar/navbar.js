'use client';

import React, { useState, Suspense, lazy, useCallback } from 'react';
import { FormControl, InputLabel, Select } from '@mui/material';
import './navbar.css';

const NavbarData = lazy(() => import('./NavbarData'));
const LazyMenuItems = lazy(() => import('./LazyItems'));

export const navbarData = {
  items: ["Acasa", "Magazin", "Blog", "Despre Noi", "Contact"]
};

const Navbar = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [showAcasa, setShowAcasa] = useState(false);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const handleMouseEnter = useCallback((index) => {
    if (index === 1) {
      setShowAcasa(true);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setShowAcasa(false);
  }, []);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const generateUrl = (name) => {
    return name ? `/${name.toLowerCase().split(" ").join("-")}` : "/";
  };

  return (
    <div className="navbar">
          <Suspense fallback={<div>Loading menu items...</div>}>
            <NavbarData
              navbarData={navbarData}
              generateUrl={generateUrl}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              showAcasa={showAcasa}
            />
          </Suspense>
      <div className="formControl">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Option</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedOption}
            onChange={handleChange}
          >
            <Suspense fallback={<div>Loading menu items...</div>}>
              <LazyMenuItems items={navbarData.items} />
            </Suspense>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default Navbar;
