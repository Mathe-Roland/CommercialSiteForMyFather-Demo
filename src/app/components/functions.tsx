export const formatForURL = (str) => {
  return str
    .trim() // Eliminăm spațiile de la început și sfârșit
    .replace(/\s+/g, "-") // Înlocuim toate spațiile cu "-"
    .replace(/[^a-zA-Z0-9-]/g, "").toLowerCase(); // Permitem atât litere mari cât și mici, cifre și "-"
};


export const syncCartToDB = async (items, token) => {

  await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/panouritraforates/actions/sync`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ items }),
});

};