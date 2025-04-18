import PaymentSuccess from "./Payments";
import { Metadata } from 'next';


export const metadata:Metadata={
  title:`Confirmare plata`,
  description:`Confirmarea plății la MOSTRIK DREAMLAND este simplă și sigură. 
  Află detalii despre procesul de verificare a plăților,
   statusul tranzacției tale și informații suplimentare pentru a te bucura de o experiență fără griji.`,
}

const PaymentPage = () => {

  return (<PaymentSuccess/>);
};

export default PaymentPage;
