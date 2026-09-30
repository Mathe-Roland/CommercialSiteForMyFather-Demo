import type { Metadata } from 'next';
import Products from "./components/products/Products";



export const metadata: Metadata = {
  title: 'Produse decorative pentru interior | Panouri MDF și măști de calorifer',
  description:
    'Descoperă panouri MDF, măști de calorifer și alte produse decorative pentru amenajarea interioarelor. Modele moderne și soluții decorative de la Decorcut.',
  alternates: {
    canonical: '/',
  },
};



export default function Home() {
  return <Products />;
}