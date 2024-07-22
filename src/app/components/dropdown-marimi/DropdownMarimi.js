import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import "./DropdownMarimi.css";

const DropdownMui = ({ onChange, render, actualPrice, price, vopsit }) => {
    const [selectedValue, setSelectedValue] = useState('option1');
    const [personalizare, setPersonalizare] = useState(false);
    const [textareaValue, setTextareaValue] = useState("Adauga o mesaj de personalizare si te vom contacta noi");

    const handleNevopsit = () => {
        vopsit(false);
        const newPrice = calculatePrice(selectedValue, false);
        price(newPrice);
    };

    const handleVopsit = () => {
        vopsit(true);
        const newPrice = calculatePrice(selectedValue, true);
        price(newPrice);
    };

    const handleChange = (event) => {
        const newValue = event.target.value;
        setSelectedValue(newValue);
        onChange(newValue);
    };

    useEffect(() => {
        const newPrice = calculatePrice(selectedValue, personalizare);
        price(newPrice);
        onChange(selectedValue);
    }, [selectedValue, personalizare, price, onChange]);

    const calculatePrice = (sizeOption, isVopsit) => {
        let basePrice = actualPrice;
        switch (sizeOption) {
            case 'option1':
                basePrice *= 1;
                break;
            case 'option2':
                basePrice *= 2;
                break;
            case 'option3':
                basePrice *= 3;
                break;
            default:
                break;
        }
        if (isVopsit) {
            basePrice += basePrice * 0.5; // Adding 50% if vopsit
        }
        return basePrice;
    };

    return (
        <div>
            <div className='personalizareSIOptiuniNormaleContainer'>
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
                <label htmlFor='selectPersonalizare2'>Optiuni normale</label>
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
                <div>
                    <p className='Marime'>Marime:</p>
                    <p>Choose an option from the dropdown:</p>
                    <FormControl fullWidth style={{ width: '25%' }}>
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
                <label htmlFor='Vopsit'>Vopsit</label>
                <input 
                    onClick={handleVopsit} 
                    className='vopsit' 
                    name="vopsit" 
                    type='radio' 
                    id="Vopsit" 
                />
                <label htmlFor='Nevopsit'>Nevopsit</label>
                <input 
                    onClick={handleNevopsit}
                    name="vopsit" 
                    type='radio'
                    id="Nevopsit" 
                />
            </div>
        </div>
    );
};

export default DropdownMui;
