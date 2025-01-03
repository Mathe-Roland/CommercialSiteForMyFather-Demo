"use client";
import { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

interface RadioButtonGroupProps {
  radioList: { label: string, value: string }[];
  formName: string;
  event: (value: any) => void;
  isEvent: boolean;
}

export default function DynamicRadioButtons({
  radioList,
  formName,
  event,
  isEvent
}: RadioButtonGroupProps) {
  const [selectedValue, setSelectedValue] = useState(radioList[0].value);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">{formName}</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        value={selectedValue}
        name="radio-buttons-group"
        onChange={handleChange}
      >
        {radioList.map((e) => (
          <FormControlLabel
            key={e.value}
            value={e.value}
            control={
              <Radio
                onClick={isEvent ? () => event(e.value) : undefined}
              />
            }
            label={e.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
