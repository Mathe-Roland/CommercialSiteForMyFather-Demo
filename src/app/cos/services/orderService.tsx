import Cookies from "js-cookie";
import { postareComenzi, postareComenziNonRegisteredUser } from
    "../../components/asyncOperations/postare-comenzi/comenzi";
export async function submitOrder({
  formData,
  cartItems,
  grandTotal,
  payment,
}) {
  const userExist = Cookies.get("user");
  let description = "";

  cartItems.forEach((item, index) => {
      description += `${index + 1}. ${item.title}\n`;
      description += `   Cantitate: ${item.quantity}\n`;

      if (item.selectedValues) {
        description += `   Optiuni: ${item.selectedValues}\n`;
      }

      if (typeof item.vopsit === "boolean") {
        description += `   Vopsit: ${item.vopsit ? "Da" : "Nu"}\n`;
      }

      description += `   Pret unitar: ${item.price} RON\n`;
      description += "\n";
    });


  const payload = {
    ...formData,
    total: grandTotal,
    description,
    payment,
    date: new Date(),
  };

  if (userExist) {
    await postareComenzi(payload);
  } else {
    await postareComenziNonRegisteredUser(payload);
  }
}