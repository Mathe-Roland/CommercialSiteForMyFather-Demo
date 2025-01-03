import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import "./DropdownMarimi.css";
import TextField from "@mui/material/TextField";
import DynamicRadioButtons from "../DynamicRadioButtons/RadioButtonGroup";
import VopsitRadio from "../DynamicRadioButtons/VopsitRadio/VopsitRadio";

interface DropDownCustomizatProps {
    price: (value: number) => void;
    vopsit: (value: boolean) => void;
    actualPrice: number;
    render: (value: boolean) => void;
    onChange: (value: string) => void;
}


const DropDownCustomizat = ({ onChange, render, actualPrice, price, vopsit }:DropDownCustomizatProps) => {
    const [selectedValue, setSelectedValue] = useState("option1");
    const [personalizare, setPersonalizare] = useState(false);
    const [textareaValue, setTextareaValue] = useState("Adauga un mesaj de personalizare si te vom contacta noi si apasa butonul adauga");
    const [vopsea, setVopsea] = useState(false);

    const radioOptions = [
        { label: 'Optiuni', value: 'Optiuni' },
        { label: 'Personalizare', value: 'Personalizare' },
      ];
      

    const handleNevopsit = () => {
        setVopsea(true);
        vopsit(false);
        const newPrice = actualPrice - (actualPrice * 30) / 100;
        price(newPrice);
    };

    const handleVopsit = () => {
        setVopsea(true);
        vopsit(true);
        const newPrice = actualPrice + (actualPrice * 30) / 100;
        price(newPrice);
    };

    const handleChange = (event) => {
        const newValue = event.target.value;
        setSelectedValue(newValue);
        onChange(newValue);
    };

    useEffect(() => {
        if (vopsea) {
            const newPrice = actualPrice + (actualPrice * 30) / 100;
            price(newPrice);
        }
        onChange(selectedValue);
    }, [selectedValue]);

    
    const isPersonalizare=(event)=>{
        if(event==="Personalizare"){
            setPersonalizare(true)
            render(true);

        }else{
            setPersonalizare(false);
            render(false);
        } 
    }


    return (
        <div className="dropdownMarimi">
            <div className="personalizareSIOptiuniNormaleContainer">
                <DynamicRadioButtons 
                    formName="Personalizare" 
                    radioList={radioOptions} 
                    event={isPersonalizare} 
                    isEvent={true}
                />
            </div>

            {personalizare ? (
               
                <TextField
                    id="outlined-textarea"
                    label="Multiline Placeholder"
                    placeholder="Text de personalizare"
                    multiline
                    value={textareaValue}
                    onChange={(e) => {
                        setTextareaValue(e.target.value);
                        onChange(e.target.value);
                    }}
                />
            ) : (
                <div className="dropdownMarimi">
                    <p>Marime:</p>
                    <FormControl fullWidth style={{ minWidth: "150px", maxWidth: "25%" }}>
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

              <VopsitRadio
                handleNevopsit={handleNevopsit} 
                handleVopsit={handleVopsit} 
                />

            </div>
        </div>
    );
};

export default DropDownCustomizat;
