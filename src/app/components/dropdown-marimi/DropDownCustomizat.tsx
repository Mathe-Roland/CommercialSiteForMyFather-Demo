import React, { useState, useEffect } from "react";
import VopsitRadio from "../DynamicRadioButtons/VopsitRadio/VopsitRadio";
import "./DropdownMarimi.css";
import PersonalizareSMarime from "../personalizare-s-marime/PersonalizareSMarime";
import { convertLegacyProps } from "antd/es/button";

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
  const [selectedValue, setSelectedValue] = useState("");
  const [personalizare, setPersonalizare] = useState(false);
  const [value, setValue] = useState(false);


useEffect(() => {
  let newPrice = actualPrice;
  const isVopsit = value === true;

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
  if (listOfMarimi.length > 0) {
    const defaultValue = listOfMarimi[0];

    setSelectedValue(defaultValue);
    onPersonalizareChange(defaultValue);
  }
}, [listOfMarimi]);



  const handlePersonalizareChange = (value: string) => {
    const isPersonalizare = value === "Personalizare";
    setPersonalizare(isPersonalizare);
    render(isPersonalizare);
  };

   const handleNevopsit = () => {
        setValue(false);
    };

    const handleVopsit = () => {
        setValue(true);
        
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

      <VopsitRadio handleNevopsit={handleNevopsit} handleVopsit={handleVopsit} />

    </div>
  );
};

export default DropDownCustomizat;
