import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import DynamicRadioButtons from "../DynamicRadioButtons/RadioButtonGroup";
import { useState } from "react";

type PersonalizareSMarimeProps={
    handlePersonalizareChange:(value:string)=>void;
    personalizare:boolean;
    onPersonalizareChange:(value:string)=>void;
    listOfMarimi:Array<string>;
    radioOptions:Array<{ label: string, value: string }>;
    selectedValue:string;
    handleChange:(event:any)=>void;
}

const PersonalizareSMarime = ({radioOptions,listOfMarimi,handlePersonalizareChange,personalizare,onPersonalizareChange,handleChange,selectedValue}:PersonalizareSMarimeProps) => {
    
    const [textareaValue, setTextareaValue] = useState(
        "Adauga un mesaj de personalizare si te vom contacta noi si apasa butonul adauga"
      );

      
  return (<div>
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
              label="Mesaj personalizare"
              placeholder="Text de personalizare"
              multiline
              fullWidth
              value={textareaValue}
              onChange={(e) => {
                setTextareaValue(e.target.value);
                onPersonalizareChange(e.target.value);
              }}
            />
          ) : (
    
            <div className="dropdownMarimi">
              <p>Marime:</p>
            <FormControl
                fullWidth
                style={{ minWidth: 150, maxWidth: "25%" }}
                >                
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
  </div>)
}

export default PersonalizareSMarime;