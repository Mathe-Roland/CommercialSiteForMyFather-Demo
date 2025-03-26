export const formatForURL = (str) => {
  return str
    .trim() // Eliminăm spațiile de la început și sfârșit
    .replace(/\s+/g, "-") // Înlocuim toate spațiile cu "-"
    .replace(/[^a-zA-Z0-9-]/g, ""); // Permitem atât litere mari cât și mici, cifre și "-"
};
