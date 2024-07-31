import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import "./DropdownMarimi.css";

const DropdownMui = ({ onChange, render, actualPrice, price, vopsit }) => {
    const [selectedValue, setSelectedValue] = useState('option1');
    const [personalizare, setPersonalizare] = useState(false);
    const [textareaValue, setTextareaValue] = useState("Adauga o mesaj de personalizare si te vom contacta noi");
    const [vopsea,setVopsea]=useState(false);

    const handleNevopsit = () => {
        vopsit(false);
        setVopsea(true);
        let newPrice = actualPrice - (actualPrice * 50) / 100;
        price(newPrice);
    };

    const handleVopsit = () => {
        setVopsea(true);
        vopsit(true);
        let newPrice = actualPrice + (actualPrice * 50) / 100;
        price(newPrice);
    };

    const handleChange = (event) => {
        const newValue = event.target.value;
        setSelectedValue(newValue);
        onChange(newValue);
    };

    useEffect(() => {

        if(vopsea){
            let newPrice=actualPrice+actualPrice*50/100;
            price(newPrice);
        }

        onChange(selectedValue); 
    }, [selectedValue]);

    return (
        <div className='dropdownMarimi'>
            <div className='personalizareSIOptiuniNormaleContainer'>

            <div className='optiuni-container'>
                
                <label htmlFor='selectPersonalizare1'>Personalizare</label>
                <input 
                    onClick={() => {
                        setPersonalizare(true);
                        render(true);
                    }} 
                    className='personalizare' 
                    name="personalizare" 
                    type='radio' 
                    id="selectPersonalizare1" 
                />
            </div>
            <div className='optiuni-container'>
                <label htmlFor='selectPersonalizare2'>Optiuni</label>
                <input 
                    onClick={() => {
                        setPersonalizare(false);
                        render(false);
                    }} 
                    name="personalizare" 
                    type='radio' 
                    id="selectPersonalizare2" 
                />
            </div>
                
            </div>

            {personalizare ? (
                <textarea 
                    value={textareaValue}
                    onChange={(e) => {
                        setTextareaValue(e.target.value);
                        onChange(e.target.value);
                    }}
                    className="form-control"
                    rows="5"
                    style={{ marginTop: "12px", width: "50%", maxWidth: "300px" }}
                />
            ) : (
                <div className='dropdownMarimi'>
                    <p>Marime:</p>
                    <p>Choose an option from the dropdown:</p>
                    <FormControl fullWidth style={{ minWidth: '150px',maxWidth:"25%" }}>
                        <InputLabel id="demo-simple-select-label">Select an option</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedValue}
                            label="Select an option"
                            onChange={handleChange}
                        >
                            <MenuItem value="option1">48/50</MenuItem>
                            <MenuItem value="option2">48/100</MenuItem>
                            <MenuItem value="option3">48/150</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            )}
            <div className='personalizareSIOptiuniNormaleContainer'>


            <div className='optiuni-container'>

                <label htmlFor='Vopsit'>Vopsit</label>
                <input 
                    onClick={handleVopsit} 
                    className='vopsit' 
                    name="vopsit" 
                    type='radio' 
                    id="Vopsit" 
                />
            </div>
            <div className='optiuni-container'>
                <label htmlFor='Nevopsit'>Nevopsit</label>
                <input 
                    onClick={handleNevopsit}
                    name="vopsit" 
                    type='radio'
                    id="Nevopsit" 
                />

            </div>

            </div>
        </div>
    );
};

export default DropdownMui;
