"use client";
import CosCard from "../components/cos/CosCard";
import "./Cos.css";
import CosModal from "./Modal";
import Button from '@mui/material/Button';

type CosUIProps={
    openModal:boolean;
    handleClose:()=>void;
    handleSubmit:(event)=>void;
    handleChange:(event)=>void;
    handleSubmitFormComanda:()=>void;
    cardList:{data:Array<{
        id:number,
        title:string,
        image:string,
        price:number,
        quantity:number
    }>};
    transportMessage:string;
    grandTotal:number;
    plataCuCard:()=>void;
    plataLaCurier:()=>void;
    handleComanda:()=>void;
    formData:{
        email:string;
        name:string;
        surname:string;
        country:string;
        postalCode:string;
        city:string;
        address:string;
        phoneNumber:string;
    }

}


const CosUI = ({cardList,
    openModal,
    formData,
    grandTotal,
    handleChange,
    handleSubmit,
    handleSubmitFormComanda,
    handleClose,
    transportMessage,
    plataCuCard,
    plataLaCurier,
    handleComanda}
    :
    CosUIProps) =>{


    return (
        <div>
    <div className="cos-container">
      <h2 className="cos-header">Cos de cumparaturi</h2>
      <div className="cos-separare">
        <div className="cos-produse-cumparate">
          <div className="cos-items">
            <div className="cos-produs">Produs</div>
            <div className="cos-cantitate">Cantitate</div>
            <div className="cos-pret">Pret</div>
          </div>
          {cardList.data.map((element) => {
            return (
              <CosCard
                key={element.id}
                id={element.id}
                title={element?.title}
                image={element?.image}
                price={element?.price}
                quantity={element?.quantity}
              />
            );
          })}

        </div>
        <div className="cos-trimite-comanda ">
          <div className="cos-trimite-comanda-background">
            <div className="form-check">
              <input onClick={plataCuCard}
                className="form-check-input" type="radio" name="optiune" id="optiune1" value="optiune1" />
              <label className="form-check-label" htmlFor="optiune1">
                Plata cu card
              </label>
              <input onClick={plataLaCurier}
                className="form-check-input" type="radio" name="optiune" id="optiune2" value="optiune2" />
              <label className="form-check-label" htmlFor="optiune2">
                Ramburs la curier
              </label>
            </div>
            <p className="cos-comanda">{transportMessage}</p>
            <p className="cos-comanda">Total comanda: {grandTotal}</p>
            <Button
              onClick={handleComanda}
              variant="contained"
              className="custom-button"
            >
              Trimite comanda
            </Button>
          </div>
        </div>
      </div>
      {openModal ? (
        <CosModal
            openModal={openModal}
            handleClose={handleClose}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleSubmitFormComanda={handleSubmitFormComanda}
            formData={formData}
        />
     
      ):null}
    </div>

        </div>
    );



}

export default CosUI;