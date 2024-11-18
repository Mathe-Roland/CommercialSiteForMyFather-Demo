import ContactUsForm from "./ContactClient";
import { Metadata } from 'next';


export const metadata:Metadata = {
    title: "Contactează-ne | Monstrik Dreamland",
    description: "Ia legătura cu Monstrik Dreamland! Ai întrebări, idei sau nevoie de ajutor? Contactează-ne și te vom ajuta să-ți transformi visele în realitate."
};


const ContactPage = () => {

    return (<ContactUsForm/>);
};

export default ContactPage;