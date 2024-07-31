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
  const [selectedOption, setSelectedOption] = useState('');
  const [leave,setLeave]=useState(false)

  const handleMouseOver = (index) => {
    if(index===1){
      setLeave(true);
    }
  };

  const handleMouseLeave = (index) => {
    if(index===1){
      setLeave(false)
    }
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
            <div key={index} onMouseEnter={() => handleMouseOver(index)} onMouseLeave={() => handleMouseLeave(index)}>
              <p>
                <Link href={element === "Acasa" ? "/" : generateUrl(element) || "/"}>
                  {element}
                </Link>
              </p>
              {leave ? (
                <div className="width100">
                  {!exceptionIndex.includes(index) && <Acasa />}
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
