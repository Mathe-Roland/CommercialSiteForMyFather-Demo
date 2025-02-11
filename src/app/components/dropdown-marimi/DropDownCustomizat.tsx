import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import "./DropdownMarimi.css";
import DynamicRadioButtons from "../DynamicRadioButtons/RadioButtonGroup";
import VopsitRadio from "../DynamicRadioButtons/VopsitRadio/VopsitRadio";

interface DropDownCustomizatProps {
    price: (value: number) => void;
    vopsit: (value: boolean) => void;
    actualPrice: number;
    render: (value: boolean) => void;
    onChange: (value: string) => void;
}

const DropDownCustomizat: React.FC<DropDownCustomizatProps> = ({ onChange, render, actualPrice, price, vopsit }) => {
    const [selectedValue, setSelectedValue] = useState("option1");
    const [personalizare, setPersonalizare] = useState(false);
    const [textareaValue, setTextareaValue] = useState(
        "Adauga un mesaj de personalizare si te vom contacta noi si apasa butonul adauga"
    );
    const [vopsea, setVopsea] = useState(false);

    const radioOptions = [
        { label: "Optiuni", value: "Optiuni" },
        { label: "Personalizare", value: "Personalizare" },
    ];

    const handlePrice = (selectedValue: string, isVopsit: boolean): void => {
        let newPrice = actualPrice;

        switch (selectedValue) {
            case "option2":
                newPrice *= 2;
                break;
            case "option3":
                newPrice *= 3;
                break;
            default:
                newPrice *= 1;
        }

        if (isVopsit) {
            newPrice *= 1.3;
        }

        price(newPrice);
    };

    const handleVopsitToggle = (isVopsit: boolean) => {
        setVopsea(isVopsit);
        vopsit(isVopsit);
        handlePrice(selectedValue, isVopsit);
    };

    const handleChange = (event: { target: { value: string } }) => {
        const newValue = event.target.value;
        setSelectedValue(newValue);
        onChange(newValue);
        handlePrice(newValue, vopsea);
    };

    const handlePersonalizareChange = (value: string) => {
        setPersonalizare(value === "Personalizare");
        render(value === "Personalizare");
    };

    return (
        <div className="dropdownMarimi">
            <div className="personalizareSIOptiuniNormaleContainer">
                <DynamicRadioButtons
                    formName="Personalizare"
                    radioList={radioOptions}
                    event={handlePersonalizareChange}
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

            <div className="personalizareSIOptiuniNormaleContainer">
                <VopsitRadio handleNevopsit={() => handleVopsitToggle(false)} handleVopsit={() => handleVopsitToggle(true)} />
            </div>
        </div>
    );
};

export default DropDownCustomizat;
