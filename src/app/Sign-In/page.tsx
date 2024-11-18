import { Metadata } from 'next';
import SignIn from "./SignIn";


export const metadata:Metadata = {
  title: `Înregistrare utilizator | Creează-ți cont pentru acces personalizat`,
  description: `Creează-ți cont pentru a accesa funcționalități personalizate, oferte exclusive și mai mult.`,
};

const SignInPage = () => {


  return (<SignIn/>);
};

export default SignInPage;