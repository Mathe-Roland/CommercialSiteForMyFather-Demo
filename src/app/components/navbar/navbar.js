'use client';

import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Link from "next/link"; // Use next/link instead of react-router-dom
import './navbar.css';
import Acasa from './navbarComponents/acasa';

export const navbarData = {
  items: ["Acasa", "Magazin", "Blog", "Despre Noi", "Contact"]
};

const Navbar = () => {
  const [showDropdowns, setShowDropdowns] = useState(Array(navbarData.items.length).fill(false));
  const [selectedOption, setSelectedOption] = useState('');

  const handleMouseOver = (index) => {
    const newShowDropdowns = [...showDropdowns];
    newShowDropdowns[index] = true;
    setShowDropdowns(newShowDropdowns);
  };

  const handleMouseLeave = (index) => {
    const newShowDropdowns = [...showDropdowns];
    newShowDropdowns[index] = false;
    setShowDropdowns(newShowDropdowns);
  };

  const exceptionIndex = [0, 2, 3, 4];

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
            <div key={index} onMouseEnter={() => handleMouseOver(index)} onMouseLeave={() => handleMouseLeave(index)}>
              <p>
                <Link href={element === "Acasa" ? "/" : generateUrl(element) || "/"}>
                  {element}
                </Link>
              </p>
              {showDropdowns[index] && (
                <div className="width100">
                  {!exceptionIndex.includes(index) && <Acasa />}
                </div>
              )}
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
