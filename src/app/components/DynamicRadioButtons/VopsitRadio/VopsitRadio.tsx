import DynamicRadioButtons from "../RadioButtonGroup";

const radioOptions = [
    { label: 'Nevopsit', value: 'Nevopsit' },
    { label: 'Vopsit', value: 'Vopsit' },
];


const VopsitRadio=({handleNevopsit,handleVopsit})=>{
    
    const vopsit=(value)=>{
        if(value==="Vopsit"){
            handleVopsit();
        }else{
    
            handleNevopsit();
        }
    }
    

    return(
    <DynamicRadioButtons 
    radioList={radioOptions} 
    formName={"Vopsea"} 
    event={vopsit}
    isEvent={true}
    />

)
}

export default VopsitRadio;