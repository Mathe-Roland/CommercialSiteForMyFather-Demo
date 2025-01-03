import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import "./DropdownMarimi.css";

interface dropDownMui {
    listStart: number;
    listEndPoint: number;
    listIncrement: number;
    specificitati:string;
    price:(dynamicPrice:number)=>void;
    pretIncrementat:number;
}

const DropdownMui = ({listStart,listEndPoint,listIncrement,specificitati,pretIncrementat,price}:dropDownMui) => {
    const [selectedValue, setSelectedValue] = useState("");
    
    let list=[];
    let priceList=[];


    for(let i=listStart;i<=listEndPoint;i+=listIncrement){
        list.push(i);
    }

    let pretFinal=0;

    for(let i=0;i<list.length;i++){
        if(i===0){
            priceList.push(i)
        }else{
            
            pretFinal+=pretIncrementat;
            priceList.push(pretFinal);
        }
    }
    

    const handleChange = (event) => {
        const newValue = event.target.value;
        setSelectedValue(newValue);
    };

    useEffect(() => {
    setSelectedValue(list[0].toString());
    price(0);
    }, []);

    useEffect(() => {
        if (selectedValue !== "") {
            const dynamicPrice = priceList[list.indexOf(parseInt(selectedValue))];
            if (dynamicPrice !== undefined) {
                price(dynamicPrice);
            }
        }
    }, [selectedValue]);
    
    return (
        <div className='dropdownMarimi'>            
                <div className='dropdownMarimi'>
                    <p>{specificitati}: </p>
                    <FormControl fullWidth style={{ minWidth: '150px',maxWidth:"25%" }}>
                        <InputLabel id="demo-simple-select-label">Select an option</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedValue}
                            label="Select an option"
                            onChange={handleChange}
                            >
                            {
                                list.map(e=>(<MenuItem key={e} value={e} >{e}</MenuItem>))
                            }
                        </Select>
                    </FormControl>
                </div>
        </div>
    );
};

export default DropdownMui;
