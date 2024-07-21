import React, { useState,useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import "./DropdownMarimi.css";

const DropdownMui = ({onChange,render}) => {
    const [selectedValue, setSelectedValue] = useState('option1');
    const [personalizare, setPersonalizare] = useState(false);
    const [textareaValue, setTextareaValue] = useState("Adauga o mesaj de personalizare si te vom contacta noi");

    const handleChange = (event) => {
        const newValue = event.target.value;
        setSelectedValue(newValue);
        onChange(newValue);
    };

    useEffect(() => {
        onChange(selectedValue); 
    }, [selectedValue]);

   
    return (
        <div>
            <div className='personalizareSIOptiuniNormaleContainer'>
           <label htmlFor='selectPersonalizare1'>Personalizare</label>
            <input onClick={()=>{
                setPersonalizare(true)
                render(true)
            }
                } className='personalizare' name="personalizare" type='radio' id="selectPersonalizare1"/>
            <label htmlFor='selectPersonalizare2'>Optiuni normale</label>
            <input onClick={()=>
            {setPersonalizare(false);
                render(false);
            }
            } name="personalizare"type='radio' id="selectPersonalizare2"/>
            
            </div>
            {   
                
                personalizare ? (
                    <textarea value={textareaValue}
                    onChange={(e)=>{
                        setTextareaValue(e.target.value)
                        onChange(e.target.value)
                    }}
                     className="form-control" rows="5" style={{ marginTop:"12px",width:"50%", maxWidth:"300px", }}></textarea>
                ):
                 (
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
                )
                
            }
        </div>
    );
};

export default DropdownMui;
