import React, { useState, useEffect } from "react";
import {
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import "./DropdownMarimi.css";
import PersonalizareSMarime from "../personalizare-s-marime/PersonalizareSMarime";

interface DropDownCustomizatProps {
  price: (value: number) => void;
  actualPrice: number;
  render: (value: boolean) => void;
  onPersonalizareChange: (value: string) => void;
  listOfMarimi:Array<string>;
  radioOptions:Array<{ label: string, value: string }>;
  pricingType: string;
}


const DropDownCustomizat = ({
  onPersonalizareChange,
  render,
  actualPrice,
  price,
  listOfMarimi,
  radioOptions,
  pricingType,
}: DropDownCustomizatProps) => {
  const [selectedValue, setSelectedValue] = useState(listOfMarimi[0]);
  const [personalizare, setPersonalizare] = useState(false);
  const [value, setValue] = useState("Nevopsit");


useEffect(() => {
  let newPrice = actualPrice;
  const isVopsit = value === "Vopsit";

  if (pricingType === "DIMENSIONS") {
    const index = listOfMarimi.indexOf(selectedValue);
    if (index !== -1) {
      newPrice = actualPrice * (index + 1);
    }
  }

  if (pricingType === "SIZES") {
    const sizeMultiplier = {
      S: 1,
      M: 1.3,
      L: 1.6,
      XL: 2,
    };

    newPrice = actualPrice * (sizeMultiplier[selectedValue] ?? 1);
  }

  if (isVopsit) {
    newPrice *= 1.3;
  }

  price(Math.round(newPrice));
}, [selectedValue, value, actualPrice, pricingType, listOfMarimi]);


  useEffect(() => {
    if (!listOfMarimi.includes(selectedValue)) {
          setSelectedValue(listOfMarimi[0]);
      }
  }, [listOfMarimi]);





  const handlePersonalizareChange = (value: string) => {
    const isPersonalizare = value === "Personalizare";
    setPersonalizare(isPersonalizare);
    render(isPersonalizare);
  };

  const handleForVopsitToggle = (event) => {
    setValue(event.target.value);
  };


  const handleChange = (event) => {
            const newValue = event.target.value;
            setSelectedValue(newValue);
            onPersonalizareChange(newValue);
            };

  return (
    <div className="dropdownMarimi">

      <PersonalizareSMarime
        handlePersonalizareChange={handlePersonalizareChange}
        personalizare={personalizare}
        onPersonalizareChange={onPersonalizareChange}
        listOfMarimi={listOfMarimi}
        radioOptions={radioOptions}
        selectedValue={selectedValue}
        handleChange={handleChange}
      />  

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
