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

  cartItems.forEach((item) => {
    description += `${item.title} x ${item.quantity}\n`;
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