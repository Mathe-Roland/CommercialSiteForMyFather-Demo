import DespreNoiItems from "../components/despre-noi-items/DespreNoiItems";
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: {
    absolute: "Magazin de produse decorative | Decorcut",
  },

  description:
    "Descoperă produsele decorative Decorcut: panouri MDF, măști de calorifer și soluții elegante pentru amenajarea interioarelor.",

  alternates: {
    canonical: "https://www.decorcut.ro/magazin",
  },

  openGraph: {
    title: "Magazin de produse decorative | Decorcut",
    description:
      "Descoperă panouri MDF, măști de calorifer și produse decorative pentru amenajarea interioarelor.",
    url: "https://www.decorcut.ro/magazin",
    siteName: "Decorcut",
    locale: "ro_RO",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Magazin de produse decorative | Decorcut",
    description:
      "Descoperă panouri MDF, măști de calorifer și produse decorative pentru amenajarea interioarelor.",
  },
};

const Magazin = () => {
  return (
    <DespreNoiItems params={{ categoryName: "Magazin" }} />
  );
};

export default Magazin;