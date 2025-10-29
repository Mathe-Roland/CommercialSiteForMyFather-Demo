import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import "./DropdownMarimi.css";
import DynamicRadioButtons from "../DynamicRadioButtons/RadioButtonGroup";

interface DropDownCustomizatProps {
  price: (value: number) => void;
  actualPrice: number; // base 60, for example
  render: (value: boolean) => void;
  onChange: (value: string) => void;
}

const listOfMarimi = ["48/50", "48/100", "48/150"];

const DropDownCustomizat = ({
  onChange,
  render,
  actualPrice,
  price,
}: DropDownCustomizatProps) => {
  const [selectedValue, setSelectedValue] = useState("48/50");
  const [personalizare, setPersonalizare] = useState(false);
  const [textareaValue, setTextareaValue] = useState(
    "Adauga un mesaj de personalizare si te vom contacta noi si apasa butonul adauga"
  );
  const [value, setValue] = useState("Nevopsit");

  // Radio options for "Personalizare" vs "Optiuni"
  const radioOptions = [
    { label: "Optiuni", value: "Optiuni" },
    { label: "Personalizare", value: "Personalizare" },
  ];

  /**
   * 💰 Unified price calculation logic:
   * - Always starts from the given base actualPrice (the true default, e.g. 60)
   * - Adjusts for marime (size multiplier)
   * - Adjusts for Vopsit (paint multiplier)
   */
  useEffect(() => {
    // Start fresh from the base (this one is safe to use directly)
    let newPrice = actualPrice;
    
    if (value === "Vopsit") {
      setValue("Vopsit");
    } else {
      setValue("Nevopsit")
    }
    // Apply marime multiplier
    switch (selectedValue) {
      case "48/100":
        if(value==="Vopsit"){
            newPrice *= 2;
            newPrice *= 1.3;
        }else{
        newPrice *= 2;

        }
        break;
      case "48/150":
        if(value==="Vopsit"){
            newPrice *= 3;
            newPrice *= 1.3;
        }else{
            newPrice *= 3;

        }
        break;
      default:
        if(value==="Vopsit"){
            newPrice *= 1.3;
        }else{
            newPrice *= 1;
            
        }
    }

    // Apply Vopsit/Nevopsit multiplier

    // Update parent
    console.log("Updated price:", newPrice);
    console.log("Base actual price:", actualPrice);
    console.log("Selected size:", selectedValue);
    price(newPrice);
  }, [selectedValue, value, actualPrice]); // recalc when size, finish, or base price changes

  // Handle marime dropdown
  const handleChange = (event) => {
    const newValue = event.target.value
    setSelectedValue(newValue);
    onChange(newValue);
  };

  // Handle personalizare / optiuni radio
  const handlePersonalizareChange = (value: string) => {
    const isPersonalizare = value === "Personalizare";
    setPersonalizare(isPersonalizare);
    render(isPersonalizare);
  };

  // Handle vopsit toggle
  const handleForVopsitToggle = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="dropdownMarimi">
      {/* Personalizare vs Optiuni */}
      <div className="personalizareSIOptiuniNormaleContainer">
        <DynamicRadioButtons
          formName="Personalizare"
          radioList={radioOptions}
          event={handlePersonalizareChange}
          isEvent={true}
        />
      </div>

      {/* Personalizare Textarea */}
      {personalizare ? (
        <TextField
          id="outlined-textarea"
          label="Mesaj personalizare"
          placeholder="Text de personalizare"
          multiline
          value={textareaValue}
          onChange={(e) => {
            setTextareaValue(e.target.value);
            onChange(e.target.value);
          }}
        />
      ) : (
        /* Dropdown for sizes */
        <div className="dropdownMarimi">
          <p>Marime:</p>
          <FormControl fullWidth style={{ minWidth: "150px", maxWidth: "25%" }}>
            <InputLabel id="demo-simple-select-label">Selectează o opțiune</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedValue}
              label="Selectează o opțiune"
              onChange={handleChange}
            >
              {listOfMarimi.map((marime) => (
                <MenuItem key={marime} value={marime}>
                  {marime}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      )}

      {/* Vopsit / Nevopsit Section */}
      <div className="personalizareSIOptiuniNormaleContainer">
        <FormControl component="fieldset">
          <FormLabel component="legend">Selectează tipul de finisaj</FormLabel>
          <RadioGroup
            row
            value={value}
            onChange={handleForVopsitToggle}
            name="radio-buttons-group"
          >
            <FormControlLabel value="Vopsit" control={<Radio />} label="Vopsit" />
            <FormControlLabel value="Nevopsit" control={<Radio />} label="Nevopsit" />
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
};

export default DropDownCustomizat;
