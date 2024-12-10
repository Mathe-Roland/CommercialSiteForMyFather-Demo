'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Menu } from '@mui/material';
import Link from 'next/link';
import './navbar.css';

export const navbarData = {
  items: ["Acasa", "Magazin", "Blog", "Despre Noi", "Contact"],
};

const magazinList = {
  items: ["Harti", "Masca de calorifer", "Pandative", "Panouri decorative", "Tablouri decorative", "Tablouri gravate"],
};

const Navbar = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [submenuAnchor, setSubmenuAnchor] = useState(null);
  const formControlRef = useRef(null);

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

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleOpenSubmenu = (event) => {
    setSubmenuAnchor(event.currentTarget);
  };

  const handleCloseSubmenu = () => {
    setSubmenuAnchor(null);
  };

  const generateUrl = (name) => {
    return name ? `/${name.toLowerCase().split(' ').join('-')}` : '/';
  };

  return (
    <header className="navbar">
      <nav>
        <div className="navbar-centered">
          <div className="navbar-contents">
            {!isMobile &&
              navbarData.items.map((element) => (
                <div key={element}>
                  <p className="navbar-text">
                    {element === "Magazin" ? (
                      <span onClick={handleOpenSubmenu}>{element}</span>
                    ) : (
                      <Link href={generateUrl(element)}>{element}</Link>
                    )}
                  </p>
                </div>
              ))}
          </div>
        </div>

        <div className="formControl" ref={formControlRef}>
          <FormControl fullWidth>
            <InputLabel id="main-select-label">Select Option</InputLabel>
            <Select
              labelId="main-select-label"
              id="main-select"
              value={selectedOption}
              onChange={handleChange}
              onClick={(event) => setSubmenuAnchor(event.currentTarget)}
            >
              {navbarData.items.map((e) => {
                if (e === "Magazin") {
                  return (
                    <MenuItem key="magazin" value="magazin" onClick={handleOpenSubmenu}>
                      Magazin
                    </MenuItem>
                  );
                } else {
                  return (
                    <Link href={generateUrl(e)} passHref>
                      <MenuItem value={e} key={e}>
                        {e}
                      </MenuItem>
                    </Link>
                  );
                }
              })}
            </Select>
          </FormControl>

          <Menu
            anchorEl={submenuAnchor}
            open={Boolean(submenuAnchor)}
            onClose={handleCloseSubmenu}
            MenuListProps={{
              'aria-labelledby': 'main-select',
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            PaperProps={{
              style: {
                width: formControlRef.current
                  ? formControlRef.current.offsetWidth 
                  : 'auto',
              },
            }}
          >
            {magazinList.items.map((item) => (
              <Link href={generateUrl(item)} passHref key={item}>
                <MenuItem onClick={handleCloseSubmenu}>{item}</MenuItem>
              </Link>
            ))}
          </Menu>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
